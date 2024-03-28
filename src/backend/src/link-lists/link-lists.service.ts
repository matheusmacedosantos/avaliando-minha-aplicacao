import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { parse } from 'papaparse';
import { PrismaService } from '../prisma.service';
import {
  headersMatch,
  atLeastOneRecord,
  csvRecordValidName,
  csvRecordValidEmail,
  csvRecordValidPhone,
  csvRecordValidCpf,
} from './utils/csv.specification';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class LinkListsService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private headersMatch: headersMatch,
    private atLeastOneRecord: atLeastOneRecord,
    private csvRecordValidName: csvRecordValidName,
    private csvRecordValidEmail: csvRecordValidEmail,
    private csvRecordValidPhone: csvRecordValidPhone,
    private csvRecordValidCpf: csvRecordValidCpf,
    private readonly rabbitMQService: RabbitMQService,
  ) {}

  async getUploadedFile(filePath: string): Promise<string> {
    try {
      const fileData = await readFileSync(filePath, 'utf8');
      return fileData.toString();
    } catch (error) {
      throw new Error(`Erro ao ler o arquivo: ${error.message}`);
    }
  }

  async uploadFile(file: Express.Multer.File) {
    this.validateFileType(file);
    const csvData = this.readCSVFile(file.path);
    const parsedCsv = this.parseCSV(csvData);
    // this.validateCSV(parsedCsv);

    await this.saveUsers(parsedCsv);

    const createdCsvEntities = await this.saveCSVData(parsedCsv);

    await this.sendLinkListToQueue(createdCsvEntities);

    return createdCsvEntities;
  }

  public validateFileType(file: Express.Multer.File): void {
    if (file.mimetype !== 'text/csv') {
      throw new Error('Arquivo inválido. Por favor, envie um arquivo .csv.');
    }
  }

  public readCSVFile(filePath: string): string {
    const csvFile = readFileSync(filePath, 'utf8');
    return csvFile.toString();
  }

  public parseCSV(csvData: string): any {
    return parse(csvData, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.toLowerCase().replace('#', '').trim(),
    });
  }

  public validateCSV(parsedCsv: any): void {
    if (!this.atLeastOneRecord.isSatisfiedBy(parsedCsv)) {
      throw new Error('O arquivo CSV está vazio.');
    } else if (
      !this.headersMatch.isSatisfiedBy(
        parsedCsv.meta.fields.map((header) =>
          header.toLowerCase().replace(/\s/g, ''),
        ),
      )
    ) {
      throw new Error(
        'Os headers do CSV não correspondem aos esperados ou estão fora de ordem.',
      );
    } else if (!this.csvRecordValidEmail.isSatisfiedBy(parsedCsv.data)) {
      throw new Error('Os registros de e-mail do CSV não são válidos.');
    } else if (!this.csvRecordValidPhone.isSatisfiedBy(parsedCsv.data)) {
      throw new Error('Os registros de telefone do CSV não são válidos.');
    } else if (!this.csvRecordValidName.isSatisfiedBy(parsedCsv.data)) {
      throw new Error('Os registros de nome do CSV não são válidos.');
    } else if (!this.csvRecordValidCpf.isSatisfiedBy(parsedCsv.data)) {
      throw new Error('Os registros de CPF do CSV não são válidos.');
    }
  }

  public async saveUsers(parsedCsv: any): Promise<any[]> {
    const users = parsedCsv.data.map(async (item) => {
      const email = item.email;
      const company = item.company;

      const user = await this.userService.create(email, company);

      return user;
    });

    return users;
  }

  public async saveCSVData(parsedCsv: any): Promise<any[]> {
    try {
      const createdEntitiesPromises = parsedCsv.data.map(async (item) => {
        try {
          const createdCsvEntity = await this.prisma.csvTable.create({
            data: {
              name: item.name,
              email: item.email,
              phone: item.phone,
              company: item.company,
              cpf: item.cpf,
              empresa: item.empresa,
              timestamp: new Date(),
            },
          });
          return createdCsvEntity;
        } catch (error) {
          console.error(`Erro ao salvar o objeto no banco de dados: ${error}`);
          throw new Error('Erro ao salvar os dados do CSV no banco de dados.');
        }
      });

      return await Promise.all(createdEntitiesPromises);
    } catch (error) {
      throw new Error('Erro ao salvar os dados do CSV no banco de dados.');
    }
  }

  public async sendLinkListToQueue(data: any[]): Promise<void> {
    try {
      await this.rabbitMQService.sendMessage(
        'link-list-queue',
        JSON.stringify(data),
      );
      console.log('Mensagem enviada para a fila link-list-queue', data);
    } catch (error) {
      throw new Error('Erro ao enviar mensagem para a fila link-list-queue.');
    }
  }
}

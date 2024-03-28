import { Test, TestingModule } from '@nestjs/testing';
import { LinkListsService } from './link-lists.service';
import { PrismaService } from '../prisma.service';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';
import { atLeastOneRecord, csvRecordValid, headersMatch } from './utils/csv.specification';
import * as fs from 'fs'; 

describe('LinkListsService', () => {
  let service: LinkListsService;
  let prismaService: PrismaService;
  let rabbitMQService: RabbitMQService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LinkListsService,
        PrismaService,
        RabbitMQService,
        {
          provide: headersMatch,
          useValue: jest.fn(),
        },
        {
          provide: atLeastOneRecord,
          useValue: jest.fn(),
        },
        {
          provide: csvRecordValid,
          useValue: jest.fn(),
        },
      ],
    }).compile();

    service = module.get<LinkListsService>(LinkListsService);
    prismaService = module.get<PrismaService>(PrismaService);
    rabbitMQService = module.get<RabbitMQService>(RabbitMQService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('uploadFile', () => {
    it('should throw error for invalid file type', async () => {
      const file: any = { mimetype: 'application/json' };
      await expect(service.uploadFile(file)).rejects.toThrowError('Arquivo inválido. Por favor, envie um arquivo .csv.');
    });
  });

  describe('saveCSVData', () => {
    it('should save CSV data to database', async () => {
      const parsedCsv: any = {
        data: [{ name: 'John', email: 'john@example.com', company: 'ABC Inc.' }],
      };
      const prismaCreateSpy = jest.spyOn(service['prisma'].csvTable, 'create').mockResolvedValueOnce(parsedCsv.data[0]);
      const result = await service.saveCSVData(parsedCsv);
      expect(prismaCreateSpy).toHaveBeenCalled();
      expect(result).toEqual(parsedCsv.data);
    });
  });

  describe('sendLinkListToQueue', () => {
    it('should send data to RabbitMQ queue', async () => {
      const data: any[] = [{ name: 'John', email: 'john@example.com', company: 'ABC Inc.' }];
      const rabbitMQSendMessageSpy = jest.spyOn(service['rabbitMQService'], 'sendMessage').mockResolvedValueOnce();
      await service.sendLinkListToQueue(data);
      expect(rabbitMQSendMessageSpy).toHaveBeenCalledWith('link-list-queue', JSON.stringify(data));
    });
  });


  describe('validateFileType', () => {
    it('should not throw error for valid file type', () => {
      const file: any = { mimetype: 'text/csv' };
      expect(() => service.validateFileType(file)).not.toThrowError();
    });

    it('should throw error for invalid file type', () => {
      const file: any = { mimetype: 'application/json' };
      expect(() => service.validateFileType(file)).toThrowError('Arquivo inválido. Por favor, envie um arquivo .csv.');
    });
  })

  describe('readCSVFile', () => {
    it('should read CSV file', () => {
      const filePath = '2024-T0003-ES09-G01/src/backend/src/link-lists/mocked-file/file_model.csv';
      const csvData = `name,email,phone,Company,CPF,Empresa\n` +
                      `name 1,email 1,phone 1,Company 1,CPF 1,Empresa 1\n` +
                      `name 2,email 2,phone 2,Company 2,CPF 2,Empresa 2\n` +
                      `name 3,email 3,phone 3,Company 3,CPF 3,Empresa 3`;

      const readFileSyncMock = jest.spyOn(fs, 'readFileSync').mockReturnValueOnce(csvData);

      expect(service.readCSVFile(filePath)).toEqual(csvData);

      expect(readFileSyncMock).toHaveBeenCalledWith(filePath, 'utf8');
    });
  });

  describe('parseCSV', () => {
    it('should parse CSV data', () => {
      const csvData = 'name,email\nJohn,john@example.com';
      const parsedData = {
        data: [{ email: 'john@example.com', name: 'John' }],
        errors: [],
        meta: {
          aborted: false,
          cursor: 32,
          delimiter: ',',
          fields: ['name', 'email'],
          linebreak: '\n',
          truncated: false
        }
      };
      expect(service.parseCSV(csvData)).toEqual(parsedData);
    });
  });

  it('should upload file, save data to database, and send message to RabbitMQ queue', async () => {
    const file: any = { 
      mimetype: 'text/csv',
      path: '/home/victorcarvalho/Documents/Github/Projeto-M9/2024-T0003-ES09-G01/src/backend/src/link-lists/mocked-file/file_model.csv' 
    };

    const csvData = `name,email,phone,Company,CPF,Empresa\n` +
    `name 1,email 1,phone 1,Company 1,CPF 1,Empresa 1\n`

    const mockedData = { 
      id: 1,
      name: "namee",
      email: "emaill",
      phone: "phonee",
      company: "Companyy",
      cpf: "CPFF",
      empresa: "Empresaa",
      timestamp: new Date(2023, 11, 17)
    }

    const prismaCreateSpy = jest.spyOn(prismaService.csvTable, 'create').mockResolvedValueOnce(mockedData);
    const rabbitMQSendMessageSpy = jest.spyOn(rabbitMQService, 'sendMessage').mockResolvedValueOnce();
    const validateFileTypeSpy = jest.spyOn(service, 'validateFileType').mockImplementation(() => {});
    const readCSVFileSpy = jest.spyOn(service, 'readCSVFile').mockReturnValueOnce(csvData);
    const parseCSVSpy = jest.spyOn(service, 'parseCSV').mockReturnValueOnce({ data: [mockedData] });
    const uploadFile = await service.uploadFile(file);

    expect(prismaCreateSpy).toHaveBeenCalled();
    expect(rabbitMQSendMessageSpy).toHaveBeenCalled();
    expect(validateFileTypeSpy).toHaveBeenCalled();
    expect(readCSVFileSpy).toHaveBeenCalled();
    expect(parseCSVSpy).toHaveBeenCalled();
    expect(uploadFile).toEqual([mockedData]);
  });
});
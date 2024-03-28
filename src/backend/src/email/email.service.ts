import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class EmailService {
  constructor(
    private prisma: PrismaService,
    private mailerService: MailerService,
  ) {}

  async getAllUsersCompanyIdentifier(): Promise<{
    allCompanyIdentifier: string[];
    emails: string[];
  }> {
    try {
      const users = await this.prisma.csvTable.findMany();
      const emails = users.map((user) => user.email);
      const allCompanyIdentifier = users.map(
        (user) => `${user.email}|${user.company}`,
      );
      return {
        allCompanyIdentifier,
        emails,
      };
    } catch (error) {
      throw new Error(
        `Erro ao buscar os emails dos usuários: ${error.message}`,
      );
    }
  }

  async sendEmailsToUsers() {
    try {
      const { allCompanyIdentifier, emails } =
        await this.getAllUsersCompanyIdentifier();

      for (const [email, index] of emails) {
        await this.mailerService.sendMail({
          from: 'sotrackboa.co@gmail.com',
          to: email,
          subject: 'Pesquisa de satisfação - 99',
          text: `Olá! Somos da 99 e gostaríamos de saber a sua opinião sobre o nosso serviço. Por favor, responda a pesquisa no link a seguir: https://modulo-9-jet.vercel.app/${allCompanyIdentifier[index]} . Agradecemos a sua colaboração! Atenciosamente, Equipe 99.`,
        });
      }

      return { message: 'E-mails enviados com sucesso.' };
    } catch (error) {
      return { error: `Erro ao enviar e-mails: ${error.message}` };
    }
  }
}

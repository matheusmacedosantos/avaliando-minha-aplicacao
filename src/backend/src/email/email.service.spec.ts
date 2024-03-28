import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from './email.service';
import { PrismaService } from '../prisma.service';
import { MailerService } from '@nestjs-modules/mailer';

describe('EmailService', () => {
  let service: EmailService;
  let prismaServiceMock: any;
  let mailerServiceMock: any;

  beforeEach(async () => {
    prismaServiceMock = {
      csvTable: {
        findMany: jest.fn(),
      },
    };

    mailerServiceMock = {
      sendMail: jest.fn().mockResolvedValue({}),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailService,
        { provide: MailerService, useValue: mailerServiceMock },
        { provide: PrismaService, useValue: prismaServiceMock },
      ],
    }).compile();

    service = module.get<EmailService>(EmailService);
  });

  it('should return array of user emails', async () => {
    const usersMock = [
      { id: 1, name: 'User 1', email: 'victor.carvalho@sou.inteli.edu.br' },
      { id: 2, name: 'User 2', email: 'matheus.santos@sou.inteli.edu.br' },
      { id: 3, name: 'User 3', email: 'email 1' },
    ];
    prismaServiceMock.csvTable.findMany.mockResolvedValue(usersMock);

    const emails = await service.getAllUserEmails();

    expect(emails).toEqual([
      'victor.carvalho@sou.inteli.edu.br',
      'matheus.santos@sou.inteli.edu.br',
      'email 1',
    ]);
    expect(prismaServiceMock.csvTable.findMany).toHaveBeenCalled();
  });

  it('should send emails to all users', async () => {
    prismaServiceMock.csvTable.findMany.mockResolvedValue([
      { email: 'victor.carvalho@sou.inteli.edu.br' },
      { email: 'matheus.santos@sou.inteli.edu.br' },
      { email: 'user3@example.com' },
    ]);

    await service.sendEmailsToUsers();

    expect(mailerServiceMock.sendMail).toHaveBeenCalledTimes(3);
    expect(mailerServiceMock.sendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        from: 'sotrackboa.co@gmail.com',
        subject: 'Pesquisa de satisfação - 99',
        text: expect.stringContaining(
          'Olá! Somos da 99 e gostaríamos de saber a sua opinião sobre o nosso serviço.',
        ),
      }),
    );
  });
});

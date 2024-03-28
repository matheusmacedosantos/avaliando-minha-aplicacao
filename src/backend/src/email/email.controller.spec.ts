import { Test, TestingModule } from '@nestjs/testing';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { MailerService } from '@nestjs-modules/mailer';
import { PrismaService } from '../prisma.service';

describe('EmailController', () => {
  let controller: EmailController;
  let emailService: EmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailController],
      providers: [
        EmailService,
        {
          provide: MailerService,
          useValue: {},
        },
        PrismaService,
      ],
    }).compile();

    controller = module.get<EmailController>(EmailController);
    emailService = module.get<EmailService>(EmailService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('sendEmailsToUsers', () => {
    it('should call emailService.sendEmailsToUsers and return response', async () => {
      const mockResponse = { message: 'E-mails enviados com sucesso.' };
      jest.spyOn(emailService, 'sendEmailsToUsers').mockResolvedValue(mockResponse);

      const result = await controller.sendEmailsToUsers();

      expect(emailService.sendEmailsToUsers).toHaveBeenCalled();
      expect(result).toEqual(mockResponse);
    });
  });
});

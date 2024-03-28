import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmailService } from './email.service';
import { MailerService } from '@nestjs-modules/mailer';

@Controller('email')
export class EmailController {
  constructor(
    private readonly emailService: EmailService,
    ) {}

  @Get('send-emails')
  async sendEmailsToUsers() {
    const response = await this.emailService.sendEmailsToUsers();
    return response;
  }
}

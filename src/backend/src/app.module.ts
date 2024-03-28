import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LinkListsModule } from './link-lists/link-lists.module';
import { RabbitMQService } from './rabbitmq/rabbitmq.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailModule } from './email/email.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './utils/exceptionFilter';
import { SatisfactionSurveyModule } from './satisfaction-survey/satisfaction-survey.module';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
          user: 'sotrackboa.co@gmail.com',
          pass: 'cjbw xfaz agru akla',
        },
      },
    }),
    LinkListsModule,
    EmailModule,
    SatisfactionSurveyModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    RabbitMQService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}

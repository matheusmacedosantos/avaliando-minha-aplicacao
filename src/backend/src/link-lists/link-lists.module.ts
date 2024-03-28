import { Module } from '@nestjs/common';
import { LinkListsService } from './link-lists.service';
import { LinkListsController } from './link-lists.controller';
import { PrismaService } from '../prisma.service';
import { MulterModule } from '@nestjs/platform-express';
import { RabbitMQService } from 'src/rabbitmq/rabbitmq.service';
import {
  headersMatch,
  atLeastOneRecord,
  csvRecordValidName,
  csvRecordValidEmail,
  csvRecordValidPhone,
  csvRecordValidCpf,
} from './utils/csv.specification';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MulterModule.register({
      dest: './dist/temp/file-uploads',
    }),
    UserModule,
  ],
  controllers: [LinkListsController],
  providers: [
    LinkListsService,
    PrismaService,
    headersMatch,
    atLeastOneRecord,
    csvRecordValidName,
    csvRecordValidEmail,
    csvRecordValidPhone,
    csvRecordValidCpf,
    RabbitMQService,
  ],
  exports: [PrismaService],
})
export class LinkListsModule {}

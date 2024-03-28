import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [EmailController],
  providers: [EmailService, PrismaService],
  exports: [PrismaService],
})
export class EmailModule {}

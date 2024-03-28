import { Module } from '@nestjs/common';
import { SatisfactionSurveyService } from './satisfaction-survey.service';
import { SatisfactionSurveyController } from './satisfaction-survey.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [SatisfactionSurveyController],
  providers: [SatisfactionSurveyService, PrismaService],
  exports: [PrismaService],
})
export class SatisfactionSurveyModule {}

// satisfaction-survey.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { SatisfactionSurvey } from 'src/utils/api-types.utils';

@Injectable()
export class SatisfactionSurveyService {
  constructor(private prisma: PrismaService) {}

  async createPesquisaSatisfacao(
    questionsAndAnswers: SatisfactionSurvey[],
    companyIdentifier: string
    ): Promise<any> {
      try {
        const createdSurvey = await this.prisma.satisfactionSurvey.create({
          data: {
            questionsAndAnswers: questionsAndAnswers,
            user: {
              connect: {companyIdentifier: companyIdentifier}
            }, 
          },
        });
        console.log(`Pesquisa de satisfação criada: ${createdSurvey.userId}`)

        return createdSurvey;
      } catch (error) {
        console.error(`Error creating satisfaction survey: ${error}`);
        return null;
      }
  }

  async getPesquisaSatisfacao(id: number): Promise<any> {
    try {
      const retrievedSurvey = await this.prisma.satisfactionSurvey.findUnique({
        where: {
          id: id,
        },
      });
      return retrievedSurvey;
    } catch (error) {
      console.error(`Error getting satisfaction survey by ID: ${error}`);
      return null;
    }
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SatisfactionSurveyService } from './satisfaction-survey.service';
import { SatisfactionSurvey } from 'src/utils/api-types.utils';

@Controller('satisfaction-survey')
export class SatisfactionSurveyController {
  constructor(
    private readonly satisfactionSurveyService: SatisfactionSurveyService,
  ) {}

  @Post()
  async createPesquisaSatisfacao(
    @Body() body: { survey: SatisfactionSurvey[]; companyIdentifier: string },
  ): Promise<any> {
    const response =
      await this.satisfactionSurveyService.createPesquisaSatisfacao(
        body.survey,
        body.companyIdentifier,
      );
    return response;
  }

  @Get(':id')
  async getPesquisaSatisfacao(@Param('id') id: number): Promise<any> {
    const response =
      await this.satisfactionSurveyService.getPesquisaSatisfacao(id);
    return response;
  }
}

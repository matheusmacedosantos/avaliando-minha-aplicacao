import { Test, TestingModule } from '@nestjs/testing';
import { SatisfactionSurveyController } from './satisfaction-survey.controller';
import { SatisfactionSurveyService } from './satisfaction-survey.service';
import { PrismaService } from '../prisma.service';

describe('SatisfactionSurveyController', () => {
  let controller: SatisfactionSurveyController;
  let service: SatisfactionSurveyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SatisfactionSurveyController],
      providers: [
        SatisfactionSurveyService,
        {
          provide: PrismaService,
          useValue: {} 
        },
      ],
    }).compile();

    controller = module.get<SatisfactionSurveyController>(SatisfactionSurveyController);
    service = module.get<SatisfactionSurveyService>(SatisfactionSurveyService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createPesquisaSatisfacao', () => {
    it('should call service method with correct parameters and return created survey', async () => {
      const mockQuestions = [{ question: 'How satisfied are you?', answer: 'Very satisfied' }];

      const createdSurvey = { id: 1, questionsAndAnswers: mockQuestions };

      jest.spyOn(service, 'createPesquisaSatisfacao').mockResolvedValue(createdSurvey);

      const result = await controller.createPesquisaSatisfacao(mockQuestions);

      expect(result).toEqual(createdSurvey);
    });
  });

  describe('getPesquisaSatisfacao', () => {
    it('should call service method with correct id and return survey', async () => {
      const surveyId = 1;
      const mockSurvey = { id: surveyId, questionsAndAnswers: [{ question: 'How satisfied are you?', answer: 'Very satisfied' }] };

      jest.spyOn(service, 'getPesquisaSatisfacao').mockResolvedValue(mockSurvey);

      const result = await controller.getPesquisaSatisfacao(surveyId);

      expect(result).toEqual(mockSurvey);
    });
  });
});

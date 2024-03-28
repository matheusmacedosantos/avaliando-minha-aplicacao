// satisfaction-survey.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { SatisfactionSurveyService } from './satisfaction-survey.service';
import { PrismaService } from '../prisma.service';

describe('SatisfactionSurveyService', () => {
  let service: SatisfactionSurveyService;
  let prismaServiceMock: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SatisfactionSurveyService,
        {
          provide: PrismaService,
          useFactory: () => ({
            satisfactionSurvey: {
              create: jest.fn(),
              findUnique: jest.fn(),
            },
          }),
        },
      ],
    }).compile();

    service = module.get<SatisfactionSurveyService>(SatisfactionSurveyService);
    prismaServiceMock = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a satisfaction survey', async () => {
    const questionsAndAnswers = [{ question: 'Question 1', answer: 'Answer 1' }];
    const createdSurvey = { id: 1, questionsAndAnswers }; 
    (prismaServiceMock.satisfactionSurvey.create as jest.Mock).mockResolvedValue(createdSurvey);

    const result = await service.createPesquisaSatisfacao(questionsAndAnswers);
    expect(result).toEqual(createdSurvey);
    expect(prismaServiceMock.satisfactionSurvey.create).toHaveBeenCalledWith({
      data: {
        questionsAndAnswers,
      },
    });
  });

  it('should get a satisfaction survey by ID', async () => {
    const surveyId = 1;
    const retrievedSurvey = { id: surveyId, questionsAndAnswers: [{ question: 'Question 1', answer: 'Answer 1' }] }; 
    (prismaServiceMock.satisfactionSurvey.findUnique as jest.Mock).mockResolvedValue(retrievedSurvey);

    const result = await service.getPesquisaSatisfacao(surveyId);
    expect(result).toEqual(retrievedSurvey);
    expect(prismaServiceMock.satisfactionSurvey.findUnique).toHaveBeenCalledWith({
      where: { id: surveyId },
    });
  });

  it('should return null when getting a non-existent survey', async () => {
    const nonExistentSurveyId = 9999;
    (prismaServiceMock.satisfactionSurvey.findUnique as jest.Mock).mockResolvedValue(null);

    const result = await service.getPesquisaSatisfacao(nonExistentSurveyId);
    expect(result).toBeNull();
    expect(prismaServiceMock.satisfactionSurvey.findUnique).toHaveBeenCalledWith({
      where: { id: nonExistentSurveyId },
    });
  });

  it('should return null when creating a survey with invalid data', async () => {
    const invalidQuestionsAndAnswers = null;
    (prismaServiceMock.satisfactionSurvey.create as jest.Mock).mockRejectedValue(new Error());

    const result = await service.createPesquisaSatisfacao(invalidQuestionsAndAnswers);
    expect(result).toBeNull();
    expect(prismaServiceMock.satisfactionSurvey.create).toHaveBeenCalledWith({
      data: {
        questionsAndAnswers: invalidQuestionsAndAnswers,
      },
    });
  });
});

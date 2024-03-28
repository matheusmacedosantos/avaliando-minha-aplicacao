import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RabbitMQService } from './rabbitmq/rabbitmq.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, RabbitMQService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('healthCheck()', () => {
    it('should return "Healthy!"', () => {
      expect(appController.healthCheck()).toBe('Healthy!');
    });
  });
});

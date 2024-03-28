import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { RabbitMQService } from './rabbitmq/rabbitmq.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly rabbitMQService: RabbitMQService) {}

  @Get('health-check')
  healthCheck(): string {
    return this.appService.healthCheck();
  }

  @Get('consume-message')
  async consumeMessage(): Promise<string> {
    await this.rabbitMQService.consumeMessage('link-list-queue', (message) => {
      console.log('Mensagens recebidas:', message);
    });
    return 'Recebendo mensagens da fila';
  }
}

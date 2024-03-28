import { Injectable } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitMQService {
  private readonly connection: Promise<amqp.Connection>;

  constructor() {
    this.connection = amqp.connect('amqp://localhost:5672'); 
  }

  async sendMessage(queue: string, message: string): Promise<void> {
    const conn = await this.connection;
    const channel = await conn.createChannel();
    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(message), { persistent: true });
  }

  async consumeMessage(queue: string, callback: (message: any) => void): Promise<void> {
    const conn = await this.connection;
    const channel = await conn.createChannel();
    await channel.assertQueue(queue, { durable: true });
    channel.consume(queue, (message) => {
      if (message !== null) {
        const content = message.content.toString();
        const parsedMessage = JSON.parse(content);
        callback(parsedMessage);
        channel.ack(message);
      }
    });
  }
}

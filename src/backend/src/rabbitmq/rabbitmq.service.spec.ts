import { RabbitMQService } from './rabbitmq.service';
import * as amqp from 'amqplib';

// Simula a biblioteca amqplib
jest.mock('amqplib', () => ({
  connect: jest.fn().mockResolvedValue({
    createChannel: jest.fn().mockResolvedValue({
      assertQueue: jest.fn().mockResolvedValue({}),
      sendToQueue: jest.fn(),
      consume: jest.fn(),
      ack: jest.fn(),
    }),
  }),
}));

describe('RabbitMQService', () => {
  let service: RabbitMQService;

  beforeEach(async () => {
    service = new RabbitMQService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendMessage', () => {
    it('should send a message to the specified queue', async () => {
      const queue = 'testQueue';
      const message = 'testMessage';

      await service.sendMessage(queue, message);

      const conn = await amqp.connect('amqp://localhost:5672');
      const channel = await conn.createChannel();

      expect(amqp.connect).toHaveBeenCalledWith('amqp://localhost:5672');
      expect(channel.assertQueue).toHaveBeenCalledWith(queue, { durable: true });
      expect(channel.sendToQueue).toHaveBeenCalledWith(queue, Buffer.from(message), { persistent: true });
    });
  });

  describe('consumeMessage', () => {
    it('should consume a message from the specified queue', async () => {
      const queue = 'testQueue';
      const mockCallback = jest.fn();

      // Simula a recepção de uma mensagem
      const mockMessage = { content: Buffer.from(JSON.stringify({ data: 'testData' })) };
      const conn = await amqp.connect('amqp://localhost:5672');
      const channel = await conn.createChannel();
      channel.consume.mockImplementation((queue, callback) => {
        callback(mockMessage);
      });

      await service.consumeMessage(queue, mockCallback);

      expect(amqp.connect).toHaveBeenCalledWith('amqp://localhost:5672');
      expect(channel.assertQueue).toHaveBeenCalledWith(queue, { durable: true });
      expect(mockCallback).toHaveBeenCalledWith({ data: 'testData' });
      expect(channel.ack).toHaveBeenCalledWith(mockMessage);
    });
  });
});

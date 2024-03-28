export const mockRabbitMQService = {
    sendMessage: jest.fn().mockResolvedValue(undefined),
    consumeMessage: jest.fn().mockImplementation((queueName, callback) => {
      const sampleMessage = { content: Buffer.from(JSON.stringify({ id: 1, name: 'User1' })) };
      callback(sampleMessage);
      return Promise.resolve();
    }),
  };
  
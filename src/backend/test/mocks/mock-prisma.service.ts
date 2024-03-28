
export const mockPrismaService = {
    linkList: {
      create: jest.fn().mockImplementation((dto) => Promise.resolve({ id: Date.now(), ...dto.data })),
      findMany: jest.fn().mockResolvedValue([]),
      findUnique: jest.fn().mockResolvedValue({}),
      update: jest.fn().mockImplementation((params) => Promise.resolve({ ...params.data, id: params.where.id })),
      delete: jest.fn().mockResolvedValue({}),

    },

  };
  
import { Test, TestingModule } from '@nestjs/testing';
import { ClearMapCommand } from '@modules/challenges/infrastructure/commands';
import { ClearMapUseCase } from '@modules/challenges/application/use-cases';
import { ApiClientService } from '@modules/api-client';

class MockClearMapUseCase implements Partial<ClearMapUseCase> {
  execute = jest.fn().mockImplementation(() => Promise.resolve());
}

class MockApiClientService implements Partial<ApiClientService> {
  getMap = jest
    .fn()
    .mockImplementation(() => Promise.resolve({ map: { content: [] } }));
}

describe('ClearMapCommand', () => {
  let command: ClearMapCommand;
  let clearMapUseCase: MockClearMapUseCase;
  let apiClient: MockApiClientService;

  beforeEach(async () => {
    clearMapUseCase = new MockClearMapUseCase();
    apiClient = new MockApiClientService();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClearMapCommand,
        {
          provide: ClearMapUseCase,
          useValue: clearMapUseCase,
        },
        {
          provide: ApiClientService,
          useValue: apiClient,
        },
      ],
    }).compile();

    command = module.get<ClearMapCommand>(ClearMapCommand);
  });

  it('should be defined', () => {
    expect(command).toBeDefined();
  });

  it('should clear the map', async () => {
    const mockMap = {
      map: {
        content: [
          [{ type: 0 }, null],
          [null, { type: 0 }],
        ],
      },
    };

    apiClient.getMap.mockResolvedValue(mockMap);

    await command.run();

    expect(apiClient.getMap).toHaveBeenCalled();
    expect(clearMapUseCase.execute).toHaveBeenCalledWith([
      ['POLYANET', 'SPACE'],
      ['SPACE', 'POLYANET'],
    ]);
  });
});

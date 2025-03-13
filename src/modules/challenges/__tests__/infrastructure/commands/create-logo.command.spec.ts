import { Test, TestingModule } from '@nestjs/testing';
import { CreateLogoCommand } from '@modules/challenges/infrastructure/commands';
import { CreateCrossmintLogoUseCase } from '@modules/challenges/application/use-cases';
import { ApiClientService } from '@modules/api-client';

class MockCreateCrossmintLogoUseCase
  implements Partial<CreateCrossmintLogoUseCase>
{
  execute = jest.fn().mockImplementation(() => Promise.resolve());
}

class MockApiClientService implements Partial<ApiClientService> {
  getGoal = jest.fn().mockImplementation(() => Promise.resolve({ goal: [] }));
}

describe('CreateLogoCommand', () => {
  let command: CreateLogoCommand;
  let createCrossmintLogoUseCase: MockCreateCrossmintLogoUseCase;
  let apiClient: MockApiClientService;

  beforeEach(async () => {
    createCrossmintLogoUseCase = new MockCreateCrossmintLogoUseCase();
    apiClient = new MockApiClientService();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateLogoCommand,
        {
          provide: CreateCrossmintLogoUseCase,
          useValue: createCrossmintLogoUseCase,
        },
        {
          provide: ApiClientService,
          useValue: apiClient,
        },
      ],
    }).compile();

    command = module.get<CreateLogoCommand>(CreateLogoCommand);
  });

  it('should be defined', () => {
    expect(command).toBeDefined();
  });

  it('should create logo challenge', async () => {
    const goal = [['POLYANET']];
    apiClient.getGoal.mockResolvedValue({ goal });

    await command.run();

    expect(apiClient.getGoal).toHaveBeenCalled();
    expect(createCrossmintLogoUseCase.execute).toHaveBeenCalledWith(goal);
  });
});

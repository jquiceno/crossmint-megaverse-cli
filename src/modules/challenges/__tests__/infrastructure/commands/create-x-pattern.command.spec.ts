import { Test, TestingModule } from '@nestjs/testing';
import { CreateXPatternCommand } from '@modules/challenges/infrastructure/commands';
import { CreateXUseCase } from '@modules/challenges/application/use-cases';

class MockCreateXUseCase implements Partial<CreateXUseCase> {
  execute = jest.fn().mockImplementation(() => Promise.resolve());
}

describe('CreateXPatternCommand', () => {
  let command: CreateXPatternCommand;
  let createXUseCase: MockCreateXUseCase;

  beforeEach(async () => {
    createXUseCase = new MockCreateXUseCase();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateXPatternCommand,
        {
          provide: CreateXUseCase,
          useValue: createXUseCase,
        },
      ],
    }).compile();

    command = module.get<CreateXPatternCommand>(CreateXPatternCommand);
  });

  it('should be defined', () => {
    expect(command).toBeDefined();
  });

  it('should create x pattern challenge', async () => {
    await command.run();

    expect(createXUseCase.execute).toHaveBeenCalled();
  });
});

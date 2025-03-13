import { CreateCrossmintLogoUseCase } from '@modules/challenges/application/use-cases';
import {
  CreateEntityRepository,
  GetEntityTypeByNameService,
  GetOptionsByEntityNameService,
} from '@modules/challenges/domain';
import { EntityType } from '@modules/challenges/domain/enums';

class MockCreateEntityRepository implements CreateEntityRepository {
  execute = jest.fn().mockImplementation(() => Promise.resolve());
}

class MockGetEntityTypeByNameService implements GetEntityTypeByNameService {
  execute = jest.fn();
}

class MockGetOptionsByEntityNameService
  implements GetOptionsByEntityNameService
{
  execute = jest.fn();
}

describe('CreateCrossmintLogoUseCase', () => {
  let useCase: CreateCrossmintLogoUseCase;
  let createEntity: MockCreateEntityRepository;
  let getEntityTypeByName: MockGetEntityTypeByNameService;
  let getOptionsByEntityName: MockGetOptionsByEntityNameService;

  beforeEach(() => {
    createEntity = new MockCreateEntityRepository();
    getEntityTypeByName = new MockGetEntityTypeByNameService();
    getOptionsByEntityName = new MockGetOptionsByEntityNameService();

    useCase = new CreateCrossmintLogoUseCase(
      createEntity,
      getEntityTypeByName,
      getOptionsByEntityName,
    );
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should skip SPACE cells', async () => {
    const goal = [['SPACE']];
    await useCase.execute(goal);
    expect(createEntity.execute).not.toHaveBeenCalled();
    expect(getEntityTypeByName.execute).not.toHaveBeenCalled();
    expect(getOptionsByEntityName.execute).not.toHaveBeenCalled();
  });

  it('should create POLYANET entity', async () => {
    const goal = [['POLYANET']];
    getEntityTypeByName.execute.mockReturnValue(EntityType.POLYANETS);
    getOptionsByEntityName.execute.mockReturnValue({});

    await useCase.execute(goal);

    expect(createEntity.execute).toHaveBeenCalledWith(
      EntityType.POLYANETS,
      0,
      0,
      {},
    );
  });

  it('should create SOLOON entity with color', async () => {
    const goal = [['BLUE_SOLOON']];
    getEntityTypeByName.execute.mockReturnValue(EntityType.SOLOONS);
    getOptionsByEntityName.execute.mockReturnValue({ color: 'blue' });

    await useCase.execute(goal);

    expect(createEntity.execute).toHaveBeenCalledWith(
      EntityType.SOLOONS,
      0,
      0,
      { color: 'blue' },
    );
  });

  it('should create COMETH entity with direction', async () => {
    const goal = [['UP_COMETH']];
    getEntityTypeByName.execute.mockReturnValue(EntityType.COMETHS);
    getOptionsByEntityName.execute.mockReturnValue({ direction: 'up' });

    await useCase.execute(goal);

    expect(createEntity.execute).toHaveBeenCalledWith(
      EntityType.COMETHS,
      0,
      0,
      { direction: 'up' },
    );
  });
});

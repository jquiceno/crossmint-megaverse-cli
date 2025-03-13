import { ClearMapUseCase } from '@modules/challenges/application/use-cases';
import {
  DeleteEntityRepository,
  GetEntityTypeByNameService,
} from '@modules/challenges/domain';
import { EntityType } from '@modules/challenges/domain/enums';

class MockDeleteEntityRepository implements DeleteEntityRepository {
  execute = jest.fn().mockImplementation(() => Promise.resolve());
}

class MockGetEntityTypeByNameService implements GetEntityTypeByNameService {
  execute = jest.fn().mockImplementation((name: string) => {
    switch (name) {
      case 'POLYANET':
        return EntityType.POLYANETS;
      case 'BLUE_SOLOON':
      case 'RED_SOLOON':
        return EntityType.SOLOONS;
      case 'UP_COMETH':
        return EntityType.COMETHS;
      default:
        return null;
    }
  });
}

describe('ClearMapUseCase', () => {
  let useCase: ClearMapUseCase;
  let deleteEntity: MockDeleteEntityRepository;
  let getEntityTypeByName: MockGetEntityTypeByNameService;

  beforeEach(() => {
    deleteEntity = new MockDeleteEntityRepository();
    getEntityTypeByName = new MockGetEntityTypeByNameService();
    useCase = new ClearMapUseCase(deleteEntity, getEntityTypeByName);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should skip SPACE cells', async () => {
    const goal = [['SPACE']];
    await useCase.execute(goal);
    expect(deleteEntity.execute).not.toHaveBeenCalled();
  });

  it('should delete POLYANET entity', async () => {
    const goal = [['POLYANET']];
    await useCase.execute(goal);

    expect(deleteEntity.execute).toHaveBeenCalledWith(
      EntityType.POLYANETS,
      0,
      0,
    );
  });

  it('should delete SOLOON entity', async () => {
    const goal = [['BLUE_SOLOON']];
    await useCase.execute(goal);

    expect(deleteEntity.execute).toHaveBeenCalledWith(EntityType.SOLOONS, 0, 0);
  });

  it('should delete COMETH entity', async () => {
    const goal = [['UP_COMETH']];
    await useCase.execute(goal);

    expect(deleteEntity.execute).toHaveBeenCalledWith(EntityType.COMETHS, 0, 0);
  });
});

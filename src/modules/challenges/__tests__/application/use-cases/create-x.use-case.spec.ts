import { CreateXUseCase } from '@modules/challenges/application/use-cases';
import { CreateEntityRepository } from '@modules/challenges/domain';
import { EntityType } from '@modules/challenges/domain/enums';

class MockCreateEntityRepository implements CreateEntityRepository {
  execute = jest.fn().mockImplementation(() => Promise.resolve());
}

describe('CreateXUseCase', () => {
  let useCase: CreateXUseCase;
  let createEntityMock: MockCreateEntityRepository;

  beforeEach(() => {
    createEntityMock = new MockCreateEntityRepository();
    useCase = new CreateXUseCase(createEntityMock);
  });

  it('should create X pattern with POLYANETs', async () => {
    await useCase.execute();

    // Main diagonal
    expect(createEntityMock.execute).toHaveBeenCalledWith(
      EntityType.POLYANETS,
      2,
      2,
    );
    expect(createEntityMock.execute).toHaveBeenCalledWith(
      EntityType.POLYANETS,
      3,
      3,
    );
    expect(createEntityMock.execute).toHaveBeenCalledWith(
      EntityType.POLYANETS,
      4,
      4,
    );
    expect(createEntityMock.execute).toHaveBeenCalledWith(
      EntityType.POLYANETS,
      5,
      5,
    );
    expect(createEntityMock.execute).toHaveBeenCalledWith(
      EntityType.POLYANETS,
      6,
      6,
    );
    expect(createEntityMock.execute).toHaveBeenCalledWith(
      EntityType.POLYANETS,
      7,
      7,
    );
    expect(createEntityMock.execute).toHaveBeenCalledWith(
      EntityType.POLYANETS,
      8,
      8,
    );

    // Inverse diagonal
    expect(createEntityMock.execute).toHaveBeenCalledWith(
      EntityType.POLYANETS,
      2,
      8,
    );
    expect(createEntityMock.execute).toHaveBeenCalledWith(
      EntityType.POLYANETS,
      3,
      7,
    );
    expect(createEntityMock.execute).toHaveBeenCalledWith(
      EntityType.POLYANETS,
      4,
      6,
    );
    expect(createEntityMock.execute).toHaveBeenCalledWith(
      EntityType.POLYANETS,
      6,
      4,
    );
    expect(createEntityMock.execute).toHaveBeenCalledWith(
      EntityType.POLYANETS,
      7,
      3,
    );
    expect(createEntityMock.execute).toHaveBeenCalledWith(
      EntityType.POLYANETS,
      8,
      2,
    );
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { DeleteEntityService } from '@modules/challenges/infrastructure/services';
import { ApiClientService } from '@modules/api-client';
import { EntityType } from '@modules/challenges/domain/enums';

class MockApiClientService implements Partial<ApiClientService> {
  createEntity = jest.fn().mockImplementation(() => Promise.resolve());
}

describe('DeleteEntityService', () => {
  let service: DeleteEntityService;
  let apiClient: MockApiClientService;

  beforeEach(async () => {
    apiClient = new MockApiClientService();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteEntityService,
        {
          provide: ApiClientService,
          useValue: apiClient,
        },
      ],
    }).compile();

    service = module.get<DeleteEntityService>(DeleteEntityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should delete POLYANET entity', async () => {
    await service.execute(EntityType.POLYANETS, 0, 0);

    expect(apiClient.createEntity).toHaveBeenCalledWith(
      EntityType.POLYANETS,
      0,
      0,
    );
  });

  it('should delete SOLOON entity', async () => {
    await service.execute(EntityType.SOLOONS, 0, 0);

    expect(apiClient.createEntity).toHaveBeenCalledWith(
      EntityType.SOLOONS,
      0,
      0,
    );
  });

  it('should delete COMETH entity', async () => {
    await service.execute(EntityType.COMETHS, 0, 0);

    expect(apiClient.createEntity).toHaveBeenCalledWith(
      EntityType.COMETHS,
      0,
      0,
    );
  });
});

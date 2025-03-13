import { Test, TestingModule } from '@nestjs/testing';
import { CreateEntityService } from '@modules/challenges/infrastructure/services';
import { ApiClientService } from '@modules/api-client';
import { EntityType } from '@modules/challenges/domain/enums';

class MockApiClientService implements Partial<ApiClientService> {
  createEntity = jest.fn().mockImplementation(() => Promise.resolve());
}

describe('CreateEntityService', () => {
  let service: CreateEntityService;
  let apiClient: MockApiClientService;

  beforeEach(async () => {
    apiClient = new MockApiClientService();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateEntityService,
        {
          provide: ApiClientService,
          useValue: apiClient,
        },
      ],
    }).compile();

    service = module.get<CreateEntityService>(CreateEntityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create POLYANET entity', async () => {
    await service.execute(EntityType.POLYANETS, 0, 0);

    expect(apiClient.createEntity).toHaveBeenCalledWith(
      EntityType.POLYANETS,
      0,
      0,
      undefined,
    );
  });

  it('should create SOLOON entity with color', async () => {
    const options = { color: 'blue' };
    await service.execute(EntityType.SOLOONS, 0, 0, options);

    expect(apiClient.createEntity).toHaveBeenCalledWith(
      EntityType.SOLOONS,
      0,
      0,
      options,
    );
  });

  it('should create COMETH entity with direction', async () => {
    const options = { direction: 'up' };
    await service.execute(EntityType.COMETHS, 0, 0, options);

    expect(apiClient.createEntity).toHaveBeenCalledWith(
      EntityType.COMETHS,
      0,
      0,
      options,
    );
  });
});

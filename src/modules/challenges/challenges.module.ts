import { Module } from '@nestjs/common';
import { ApiClientModule } from '../api-client/api-client.module';
import * as commands from './infrastructure/commands';
import * as services from './infrastructure/services';
import {
  CreateEntityRepository,
  DeleteEntityRepository,
  GetEntityTypeByNameService,
} from './domain';
import {
  CreateEntityService,
  DeleteEntityService,
} from './infrastructure/services';
import {
  ClearMapUseCase,
  CreateCrossmintLogoUseCase,
  CreateXUseCase,
} from './application/use-cases';

@Module({
  imports: [ApiClientModule],
  providers: [
    ...Object.values(commands),
    ...Object.values(services),
    {
      provide: CreateEntityRepository,
      useExisting: CreateEntityService,
    },
    {
      provide: DeleteEntityRepository,
      useExisting: DeleteEntityService,
    },
    {
      provide: GetEntityTypeByNameService,
      useClass: GetEntityTypeByNameService,
    },
    {
      provide: ClearMapUseCase,
      useFactory: (
        deleteEntity: DeleteEntityRepository,
        getEntityTypeByName: GetEntityTypeByNameService,
      ) => new ClearMapUseCase(deleteEntity, getEntityTypeByName),
      inject: [DeleteEntityRepository, GetEntityTypeByNameService],
    },
    {
      provide: CreateCrossmintLogoUseCase,
      useFactory: (
        createEntity: CreateEntityRepository,
        getEntityTypeByName: GetEntityTypeByNameService,
      ) => new CreateCrossmintLogoUseCase(createEntity, getEntityTypeByName),
      inject: [CreateEntityRepository, GetEntityTypeByNameService],
    },
    {
      provide: CreateXUseCase,
      useFactory: (createEntity: CreateEntityRepository) =>
        new CreateXUseCase(createEntity),
      inject: [CreateEntityRepository],
    },
  ],
  exports: [...Object.values(commands), ...Object.values(services)],
})
export class ChallengesModule {}

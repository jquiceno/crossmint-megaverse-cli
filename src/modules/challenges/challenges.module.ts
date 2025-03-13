import { Module } from '@nestjs/common';
import { ApiClientModule } from '../api-client/api-client.module';
import * as useCases from './application/use-cases';
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

@Module({
  imports: [ApiClientModule],
  providers: [
    ...Object.values(useCases),
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
  ],
  exports: [
    ...Object.values(useCases),
    ...Object.values(commands),
    ...Object.values(services),
  ],
})
export class ChallengesModule {}

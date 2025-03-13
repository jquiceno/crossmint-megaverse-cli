import { Module } from '@nestjs/common';
import { ApiClientModule } from '../api-client/api-client.module';
import * as useCases from './application/use-cases';
import * as commands from './infrastructure/commands';

@Module({
  imports: [ApiClientModule],
  providers: [...Object.values(useCases), ...Object.values(commands)],
  exports: [...Object.values(useCases), ...Object.values(commands)],
})
export class ChallengesModule {}

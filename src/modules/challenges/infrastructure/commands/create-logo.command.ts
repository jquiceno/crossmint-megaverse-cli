import { CommandRunner, Command } from 'nest-commander';
import { ApiClientService } from '@modules/api-client';

import { CreateCrossmintLogoUseCase } from '../../application/use-cases';

@Command({
  name: 'create-logo',
  description: 'Create a logo challenge',
})
export class CreateLogoCommand extends CommandRunner {
  constructor(
    private readonly createCrossmintLogoUseCase: CreateCrossmintLogoUseCase,
    private readonly apiClient: ApiClientService,
  ) {
    super();
  }

  async run(): Promise<void> {
    console.log('Creating logo challenge...');

    const { goal } = await this.apiClient.getGoal();

    await this.createCrossmintLogoUseCase.execute(goal);

    console.log('Challenge completed');
  }
}

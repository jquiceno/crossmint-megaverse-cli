import { CommandRunner, Command } from 'nest-commander';

import { CreateCrossmintLogoUseCase } from '../../application/use-cases';

@Command({
  name: 'create-logo',
  description: 'Create a logo challenge',
})
export class CreateLogoCommand extends CommandRunner {
  constructor(
    private readonly createCrossmintLogoUseCase: CreateCrossmintLogoUseCase,
  ) {
    super();
  }

  async run(): Promise<void> {
    console.log('Creating logo challenge...');

    await this.createCrossmintLogoUseCase.execute();

    console.log('Challenge completed');
  }
}

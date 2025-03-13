import { CommandRunner, Command } from 'nest-commander';

import { CreateXUseCase } from '../../application/use-cases';

@Command({
  name: 'create-x-pattern',
  description: 'Create a x pattern challenge',
})
export class CreateXPatternCommand extends CommandRunner {
  constructor(private readonly createXUseCase: CreateXUseCase) {
    super();
  }

  async run(): Promise<void> {
    console.log('Creating x pattern challenge...');

    await this.createXUseCase.execute();

    console.log('Challenge completed');
  }
}

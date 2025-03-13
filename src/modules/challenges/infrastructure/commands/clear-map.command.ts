import { CommandRunner, Command } from 'nest-commander';

import { ClearMapUseCase } from '../../application/use-cases';

@Command({
  name: 'clear-map',
  description: 'Clear the map',
})
export class ClearMapCommand extends CommandRunner {
  constructor(private readonly clearMapUseCase: ClearMapUseCase) {
    super();
  }

  async run(): Promise<void> {
    console.log('Clearing map...');

    await this.clearMapUseCase.execute();

    console.log('Map cleared');
  }
}

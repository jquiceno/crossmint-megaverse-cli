import { CommandRunner, Command } from 'nest-commander';

import { ClearMapUseCase } from '../../application/use-cases';
import {
  ApiClientService,
  transformMapToNaturalFormat,
} from '@modules/api-client';

@Command({
  name: 'clear-map',
  description: 'Clear the map',
})
export class ClearMapCommand extends CommandRunner {
  constructor(
    private readonly clearMapUseCase: ClearMapUseCase,
    private readonly apiClient: ApiClientService,
  ) {
    super();
  }

  async run(): Promise<void> {
    console.log('Clearing map...');

    const map = await this.apiClient.getMap();

    await this.clearMapUseCase.execute(transformMapToNaturalFormat(map));

    console.log('Map cleared');
  }
}

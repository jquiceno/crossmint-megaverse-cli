import { Command, CommandRunner } from 'nest-commander';
import { ApiClientService } from '../modules/api-client/api-client.service';

@Command({ name: 'map', description: 'Get the current map state' })
export class MapCommand extends CommandRunner {
  constructor(private readonly apiClient: ApiClientService) {
    super();
  }

  async run(): Promise<void> {
    try {
      const response = await this.apiClient.getMap();
      console.log(JSON.stringify(response, null, 2));
    } catch (error) {
      console.error('Error fetching map:', (error as Error).message);
    }
  }
}

import { Command, CommandRunner } from 'nest-commander';
import { ApiClientService } from '@modules/api-client/api-client.service';
import { transformMapToNaturalFormat } from '@modules/api-client';

@Command({
  name: 'map-goal',
  description: 'Get the current map in goal format',
})
export class MapGoalCommand extends CommandRunner {
  constructor(private readonly apiClient: ApiClientService) {
    super();
  }

  async run(): Promise<void> {
    try {
      const response = await this.apiClient.getMap();
      console.log(
        JSON.stringify(transformMapToNaturalFormat(response), null, 2),
      );
    } catch (error) {
      console.error('Error getting map as goal:', (error as Error).message);
    }
  }
}

import { Command, CommandRunner } from 'nest-commander';
import { ApiClientService } from '../modules/api-client/api-client.service';

@Command({ name: 'goal', description: 'Get the megaverse goal' })
export class GoalCommand extends CommandRunner {
  constructor(private readonly apiClient: ApiClientService) {
    super();
  }

  async run(): Promise<void> {
    try {
      const response = await this.apiClient.getGoal();
      console.log(JSON.stringify(response, null, 2));
    } catch (error) {
      console.error('Error fetching goal:', (error as Error).message);
    }
  }
}

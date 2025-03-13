import { Command, CommandRunner } from 'nest-commander';
import { ApiClientService } from '../modules/api-client/api-client.service';
import { transformMapToNaturalFormat, EntityType } from '@modules/api-client';

@Command({
  name: 'clear',
  description: 'Clear all entities from the map',
})
export class ClearCommand extends CommandRunner {
  constructor(private readonly apiClient: ApiClientService) {
    super();
  }

  private getEntityType(type: string): EntityType | null {
    if (type === 'POLYANET') return EntityType.POLYANETS;
    if (type.endsWith('_SOLOON')) return EntityType.SOLOONS;
    if (type.endsWith('_COMETH')) return EntityType.COMETHS;

    return null;
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async run(): Promise<void> {
    try {
      console.log('Fetching current map state...');
      const response = await this.apiClient.getMap();
      const map = transformMapToNaturalFormat(response);

      console.log('Starting to clear entities...');
      let deletedCount = 0;
      let failedCount = 0;

      for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[row].length; col++) {
          const cell = map[row][col];
          if (cell === 'SPACE') continue;

          const entityType = this.getEntityType(cell);
          if (!entityType) continue;

          try {
            await this.apiClient.deleteEntity(entityType, row, col);
            deletedCount++;

            await this.delay(500);
          } catch (error) {
            failedCount++;
            console.error(
              `Failed to delete ${cell} at [${row}, ${col}]:`,
              error instanceof Error ? error.message : String(error),
            );
          }
        }
      }

      console.log(`Map clearing completed!`);
      console.log(`Successfully deleted: ${deletedCount} entities`);
      if (failedCount > 0) {
        console.log(`Failed to delete: ${failedCount} entities`);
      }
    } catch (error) {
      console.error(
        'Error clearing map:',
        error instanceof Error ? error.message : String(error),
      );
    }
  }
}

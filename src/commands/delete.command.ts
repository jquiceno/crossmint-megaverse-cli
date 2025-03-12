import { Command, CommandRunner, Option } from 'nest-commander';
import { ApiClientService } from '../modules/api-client/api-client.service';
import { EntityType } from '../modules/api-client/enums';

@Command({
  name: 'delete',
  description: 'Delete an entity from the megaverse',
})
export class DeleteCommand extends CommandRunner {
  constructor(private readonly apiClient: ApiClientService) {
    super();
  }

  @Option({
    flags: '-t, --type <type>',
    description: 'Entity type (polyanets, soloons, comeths)',
    required: true,
  })
  parseType(val: EntityType): EntityType {
    if (!Object.values(EntityType).includes(val)) {
      throw new Error(
        'Invalid entity type. Must be: polyanets, soloons, or comeths',
      );
    }
    return val;
  }

  @Option({
    flags: '-r, --row <row>',
    description: 'Row position',
    required: true,
  })
  parseRow(val: string): number {
    return parseInt(val, 10);
  }

  @Option({
    flags: '-c, --column <column>',
    description: 'Column position',
    required: true,
  })
  parseColumn(val: string): number {
    return parseInt(val, 10);
  }

  async run(
    passedParams: string[],
    options: {
      type: EntityType;
      row: number;
      column: number;
    },
  ): Promise<void> {
    try {
      const { type, row, column } = options;
      const response = await this.apiClient.deleteEntity(type, row, column);
      console.log(`Entity deleted successfully:`, response);
    } catch (error) {
      console.error('Error deleting entity:', (error as Error).message);
    }
  }
}

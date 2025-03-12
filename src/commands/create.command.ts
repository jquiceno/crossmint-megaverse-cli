import { Command, CommandRunner, Option } from 'nest-commander';
import { ApiClientService } from '../modules/api-client/api-client.service';
import { Direction, Color, EntityType } from '../modules/api-client/types';

@Command({
  name: 'create',
  description: 'Create an entity in the megaverse',
})
export class CreateCommand extends CommandRunner {
  constructor(private readonly apiClient: ApiClientService) {
    super();
  }

  @Option({
    flags: '-t, --type <type>',
    description: 'Entity type (polyanets, soloons, comeths)',
    required: true,
  })
  parseType(val: string): EntityType {
    if (!['polyanets', 'soloons', 'comeths'].includes(val)) {
      throw new Error(
        'Invalid entity type. Must be: polyanets, soloons, or comeths',
      );
    }
    return val as EntityType;
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

  @Option({
    flags: '-d, --direction <direction>',
    description:
      'Direction for comeths (up, down, left, right). Defaults to up',
  })
  parseDirection(val: string): Direction {
    if (!['up', 'down', 'left', 'right'].includes(val)) {
      throw new Error('Invalid direction. Must be: up, down, left, or right');
    }
    return val.toUpperCase() as Direction;
  }

  @Option({
    flags: '--color <color>',
    description:
      'Color for soloons (white, blue, red, purple). Defaults to red',
  })
  parseColor(val: string): Color {
    if (!['white', 'blue', 'red', 'purple'].includes(val)) {
      throw new Error('Invalid color. Must be: white, blue, red, or purple');
    }
    return val.toUpperCase() as Color;
  }

  async run(
    passedParams: string[],
    options: {
      type: EntityType;
      row: number;
      column: number;
      direction?: Direction;
      color?: Color;
    },
  ): Promise<void> {
    try {
      const { type, row, column, direction, color } = options;

      const entityOptions = {
        direction:
          type === 'comeths' ? direction || ('up' as Direction) : direction,
        color: type === 'soloons' ? color || ('red' as Color) : color,
      };

      const response = await this.apiClient.createEntity(
        type,
        row,
        column,
        entityOptions,
      );
      console.log(`Entity created successfully:`, response);
    } catch (error) {
      console.error('Error creating entity:', (error as Error).message);
    }
  }
}

import { Command, CommandRunner, Option } from 'nest-commander';
import { ApiClientService } from '../modules/api-client/api-client.service';
import { Color, Direction, EntityType } from '../modules/api-client/enums';
import { validateOptions } from './validate';

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
    const entityType = val.toLowerCase();

    if (!Object.values(EntityType).includes(entityType as EntityType)) {
      throw new Error(
        'Invalid entity type. Must be: polyanets, soloons, or comeths',
      );
    }

    return entityType as EntityType;
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
    const direction = val.toLowerCase();
    return direction as Direction;
  }

  @Option({
    flags: '--color <color>',
    description:
      'Color for soloons (white, blue, red, purple). Defaults to red',
  })
  parseColor(val: string): Color {
    const color = val.toLowerCase();
    return color as Color;
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

      validateOptions({ type, direction, color });

      const entityOptions = {
        direction:
          type === EntityType.COMETHS ? direction || Direction.UP : direction,
        color: type === EntityType.SOLOONS ? color || Color.RED : color,
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

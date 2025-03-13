import { Color, Direction } from '../enums';

export class GetOptionsByEntityNameService {
  execute(type: string): {
    direction?: Direction;
    color?: Color;
  } {
    const options: { direction?: Direction; color?: Color } = {};

    if (type.endsWith('_SOLOON')) {
      const colorStr = type.split('_')[0].toLowerCase();
      options.color = colorStr as Color;
    }

    if (type.endsWith('_COMETH')) {
      const directionStr = type.split('_')[0].toLowerCase();
      options.direction = directionStr as Direction;
    }

    return options;
  }
}

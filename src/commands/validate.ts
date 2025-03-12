import { Color, Direction, EntityType } from '../modules/api-client/enums';

interface ValidateOptionsParams {
  type: EntityType;
  direction?: Direction;
  color?: Color;
}

export const validateOptions = (options: ValidateOptionsParams) => {
  const { type, direction, color } = options;

  if (type === EntityType.COMETHS && direction === undefined) {
    return Direction.UP;
  }

  if (type === EntityType.SOLOONS && color === undefined) {
    return Color.RED;
  }

  if (type === EntityType.COMETHS && direction) {
    if (!Object.values(Direction).includes(direction)) {
      throw new Error('Invalid direction. Must be: up, down, left, or right');
    }
  }

  if (type === EntityType.SOLOONS && color) {
    if (!Object.values(Color).includes(color)) {
      throw new Error('Invalid color. Must be: white, blue, red, or purple');
    }
  }
};

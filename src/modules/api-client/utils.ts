import { GoalResponse, MapResponse, SpaceType, MapCell } from './types';

export const transformMapToGoalFormat = (
  mapResponse: MapResponse,
): GoalResponse => {
  const transformCell = (cell: MapCell | null): SpaceType => {
    if (!cell) return 'SPACE';

    if (cell.direction) {
      return `${cell.direction.toUpperCase()}_COMETH` as SpaceType;
    }

    if (cell.color) {
      return `${cell.color.toUpperCase()}_SOLOON` as SpaceType;
    }

    return 'POLYANET';
  };

  const goal = mapResponse.map.content.map((row) =>
    row.map((cell) => transformCell(cell)),
  );

  return { goal };
};

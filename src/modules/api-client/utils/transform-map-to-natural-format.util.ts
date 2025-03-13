import { MapResponse, SpaceType, MapCell } from '../interfaces';

export const transformMapToNaturalFormat = (
  mapResponse: MapResponse,
): SpaceType[][] => {
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

  return mapResponse.map.content.map((row) =>
    row.map((cell) => transformCell(cell)),
  );
};

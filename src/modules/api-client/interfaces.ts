import { Color, Direction } from './enums';

export type SpaceType =
  | 'SPACE'
  | 'POLYANET'
  | `${Direction}_COMETH`
  | `${Color}_SOLOON`;

export interface GoalResponse {
  goal: SpaceType[][];
}

export interface ApiClientConfig {
  baseUrl: string;
  candidateId: string;
}

export interface MapCell {
  type: number;
  direction?: Direction;
  color?: Color;
}

export interface MapResponse {
  map: {
    content: (MapCell | null)[][];
    candidateId: string;
    phase: number;
  };
}

export interface EntityPosition {
  row: number;
  column: number;
}

export interface CreateEntityRequest extends EntityPosition {
  candidateId: string;
  direction?: Direction;
  color?: Color;
}

export interface DeleteEntityRequest extends EntityPosition {
  candidateId: string;
}

export interface EntityResponse {
  success: boolean;
}

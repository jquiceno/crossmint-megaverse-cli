export type SpaceType =
  | 'SPACE'
  | 'POLYANET'
  | 'RIGHT_COMETH'
  | 'LEFT_COMETH'
  | 'UP_COMETH'
  | 'DOWN_COMETH'
  | 'WHITE_SOLOON'
  | 'BLUE_SOLOON'
  | 'RED_SOLOON'
  | 'PURPLE_SOLOON';

export interface GoalResponse {
  goal: SpaceType[][];
}

export interface ApiClientConfig {
  baseUrl: string;
  candidateId: string;
}

export type Direction = 'up' | 'down' | 'left' | 'right';
export type Color = 'white' | 'blue' | 'red' | 'purple';

export interface MapCell {
  type: number;
  direction?: Direction;
  color?: Color;
}

export interface MapResponse {
  map: {
    _id: string;
    content: (MapCell | null)[][];
    candidateId: string;
    phase: number;
    __v: number;
  };
}

export type EntityType = 'polyanets' | 'soloons' | 'comeths';

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

import { EntityType } from '../enums';

export abstract class CreateEntityRepository {
  abstract execute(
    type: EntityType,
    x: number,
    y: number,
    options?: any,
  ): Promise<void>;
}

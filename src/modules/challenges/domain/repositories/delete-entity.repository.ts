import { EntityType } from '../enums';

export abstract class DeleteEntityRepository {
  abstract execute(
    entityType: EntityType,
    row: number,
    column: number,
  ): Promise<void>;
}

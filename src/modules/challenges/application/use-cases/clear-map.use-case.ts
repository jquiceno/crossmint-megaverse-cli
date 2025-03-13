import {
  DeleteEntityRepository,
  GetEntityTypeByNameService,
} from '@modules/challenges/domain';

export class ClearMapUseCase {
  constructor(
    private readonly deleteEntity: DeleteEntityRepository,
    private readonly getEntityTypeByName: GetEntityTypeByNameService,
  ) {}

  async execute(
    map: string[][],
  ): Promise<{ failedCount: number; deletedCount: number }> {
    let deletedCount = 0;
    let failedCount = 0;

    for (let row = 0; row < map.length; row++) {
      for (let col = 0; col < map[row].length; col++) {
        const cell = map[row][col];
        if (cell === 'SPACE') continue;

        const entityType = this.getEntityTypeByName.execute(cell);
        if (!entityType) continue;

        try {
          await this.deleteEntity.execute(entityType, row, col);
          deletedCount++;

          await this.delay(100);
        } catch {
          failedCount++;
        }
      }
    }

    return { failedCount, deletedCount };
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

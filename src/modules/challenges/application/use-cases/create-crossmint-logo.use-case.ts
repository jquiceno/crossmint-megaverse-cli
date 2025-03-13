import {
  CreateEntityRepository,
  GetEntityTypeByNameService,
  GetOptionsByEntityNameService,
} from '@modules/challenges/domain';

export class CreateCrossmintLogoUseCase {
  constructor(
    private readonly createEntity: CreateEntityRepository,
    private readonly getEntityTypeByName: GetEntityTypeByNameService,
    private readonly getOptionsByEntityName: GetOptionsByEntityNameService,
  ) {}

  async execute(goal: string[][]): Promise<void> {
    for (let row = 0; row < goal.length; row++) {
      for (let col = 0; col < goal[row].length; col++) {
        const cell = goal[row][col];
        if (cell === 'SPACE') continue;

        const entityType = this.getEntityTypeByName.execute(cell);

        if (!entityType) continue;

        const options = this.getOptionsByEntityName.execute(cell);
        await this.createEntity.execute(entityType, row, col, options);
        await this.delay(100);
      }
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

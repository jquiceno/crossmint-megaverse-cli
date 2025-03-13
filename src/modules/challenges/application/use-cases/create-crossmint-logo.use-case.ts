import { Injectable } from '@nestjs/common';
import { getEntityOptions } from '@modules/api-client';
import {
  CreateEntityRepository,
  GetEntityTypeByNameService,
} from '@modules/challenges/domain';

@Injectable()
export class CreateCrossmintLogoUseCase {
  constructor(
    private readonly createEntity: CreateEntityRepository,
    private readonly getEntityTypeByName: GetEntityTypeByNameService,
  ) {}

  async execute(goal: string[][]): Promise<void> {
    for (let row = 0; row < goal.length; row++) {
      for (let col = 0; col < goal[row].length; col++) {
        const cell = goal[row][col];
        if (cell === 'SPACE') continue;

        const entityType = this.getEntityTypeByName.execute(cell);

        if (!entityType) continue;

        const options = getEntityOptions(cell);
        await this.createEntity.execute(entityType, row, col, options);
        await this.delay(100);
      }
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

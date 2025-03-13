import { Injectable } from '@nestjs/common';
import { getEntityType, getEntityOptions } from '@modules/api-client';
import { CreateEntityRepository } from '@modules/challenges/domain';

@Injectable()
export class CreateCrossmintLogoUseCase {
  constructor(private readonly createEntity: CreateEntityRepository) {}

  async execute(goal: string[][]): Promise<void> {
    for (let row = 0; row < goal.length; row++) {
      for (let col = 0; col < goal[row].length; col++) {
        const cell = goal[row][col];
        if (cell === 'SPACE') continue;

        const entityType = getEntityType(cell);

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

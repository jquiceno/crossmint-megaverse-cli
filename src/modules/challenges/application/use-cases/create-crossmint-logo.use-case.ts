import { Injectable } from '@nestjs/common';
import {
  getEntityType,
  ApiClientService,
  getEntityOptions,
} from '@modules/api-client';

@Injectable()
export class CreateCrossmintLogoUseCase {
  constructor(private readonly apiClient: ApiClientService) {}

  async execute(): Promise<void> {
    const { goal } = await this.apiClient.getGoal();

    for (let row = 0; row < goal.length; row++) {
      for (let col = 0; col < goal[row].length; col++) {
        const cell = goal[row][col];
        if (cell === 'SPACE') continue;

        const entityType = getEntityType(cell);

        if (!entityType) continue;

        const options = getEntityOptions(cell);
        await this.apiClient.createEntity(entityType, row, col, options);
      }
    }
  }
}

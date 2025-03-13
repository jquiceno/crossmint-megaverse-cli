import { Injectable } from '@nestjs/common';
import {
  ApiClientService,
  transformMapToNaturalFormat,
  getEntityType,
} from '@modules/api-client';

@Injectable()
export class ClearMapUseCase {
  constructor(private readonly apiClient: ApiClientService) {}

  async execute(): Promise<{ failedCount: number; deletedCount: number }> {
    const response = await this.apiClient.getMap();
    const map = transformMapToNaturalFormat(response);

    let deletedCount = 0;
    let failedCount = 0;

    for (let row = 0; row < map.length; row++) {
      for (let col = 0; col < map[row].length; col++) {
        const cell = map[row][col];
        if (cell === 'SPACE') continue;

        const entityType = getEntityType(cell);
        if (!entityType) continue;

        try {
          await this.apiClient.deleteEntity(entityType, row, col);
          deletedCount++;

          await this.delay(500);
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

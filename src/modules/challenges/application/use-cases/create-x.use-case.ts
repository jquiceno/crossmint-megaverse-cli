import { Injectable } from '@nestjs/common';
import { ApiClientService } from '@modules/api-client/api-client.service';
import { EntityType } from '@modules/api-client/enums';

@Injectable()
export class CreateXUseCase {
  constructor(private readonly apiClient: ApiClientService) {}

  async execute(): Promise<void> {
    const size = 11;

    for (let i = 2; i < size - 2; i++) {
      await this.apiClient.createEntity(EntityType.POLYANETS, i, i);

      const j = size - 1 - i;
      if (j !== i) {
        await this.apiClient.createEntity(EntityType.POLYANETS, i, j);
      }
    }
  }
}

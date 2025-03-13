import { Injectable } from '@nestjs/common';
import { EntityType, CreateEntityRepository } from '../../domain';

@Injectable()
export class CreateXUseCase {
  constructor(private readonly createEntirty: CreateEntityRepository) {}

  async execute(): Promise<void> {
    const size = 11;

    for (let i = 2; i < size - 2; i++) {
      await this.createEntirty.execute(EntityType.POLYANETS, i, i);

      const j = size - 1 - i;
      if (j !== i) {
        await this.createEntirty.execute(EntityType.POLYANETS, i, j);
      }
    }
  }
}

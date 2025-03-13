import { Injectable } from '@nestjs/common';
import { CreateEntityRepository, EntityType } from '../../domain';
import { ApiClientService } from '@modules/api-client';

@Injectable()
export class CreateEntityService implements CreateEntityRepository {
  constructor(private readonly apiClient: ApiClientService) {}

  async execute(
    type: EntityType,
    x: number,
    y: number,
    options?: any,
  ): Promise<void> {
    await this.apiClient.createEntity(type, x, y, options);
  }
}

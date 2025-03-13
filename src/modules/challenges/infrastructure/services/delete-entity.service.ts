import { Injectable } from '@nestjs/common';
import { DeleteEntityRepository, EntityType } from '../../domain';
import { ApiClientService } from '@modules/api-client';

@Injectable()
export class DeleteEntityService implements DeleteEntityRepository {
  constructor(private readonly apiClient: ApiClientService) {}

  async execute(type: EntityType, x: number, y: number): Promise<void> {
    await this.apiClient.createEntity(type, x, y);
  }
}

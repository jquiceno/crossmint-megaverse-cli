import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import {
  GoalResponse,
  ApiClientConfig,
  MapResponse,
  EntityType,
  CreateEntityRequest,
  DeleteEntityRequest,
  EntityResponse,
  Direction,
  Color,
} from './types';
import { transformMapToGoalFormat } from './utils';

@Injectable()
export class ApiClientService {
  private readonly client: AxiosInstance;
  private readonly candidateId: string;

  constructor(config: ApiClientConfig) {
    this.client = axios.create({
      baseURL: config.baseUrl,
    });
    this.candidateId = config.candidateId;
  }

  async getGoal(): Promise<GoalResponse> {
    const { data } = await this.client.get<GoalResponse>(
      `/map/${this.candidateId}/goal`,
    );
    return data;
  }

  async getMap(): Promise<MapResponse> {
    const { data } = await this.client.get<MapResponse>(
      `/map/${this.candidateId}`,
    );
    return data;
  }

  async getMapAsGoal(): Promise<GoalResponse> {
    const mapResponse = await this.getMap();
    return transformMapToGoalFormat(mapResponse);
  }

  async createEntity(
    entityType: EntityType,
    row: number,
    column: number,
    options?: { direction?: Direction; color?: Color },
  ): Promise<EntityResponse> {
    const request: CreateEntityRequest = {
      candidateId: this.candidateId,
      row,
      column,
      ...options,
    };

    const { data } = await this.client.post<EntityResponse>(
      `/${entityType}`,
      request,
    );
    return data;
  }

  async deleteEntity(
    entityType: EntityType,
    row: number,
    column: number,
  ): Promise<EntityResponse> {
    const request: DeleteEntityRequest = {
      candidateId: this.candidateId,
      row,
      column,
    };

    const { data } = await this.client.delete<EntityResponse>(
      `/${entityType}`,
      { data: request },
    );
    return data;
  }
}

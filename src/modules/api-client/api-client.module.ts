import { Module } from '@nestjs/common';
import { ApiClientService } from './api-client.service';
import { ApiClientConfig } from './interfaces';

@Module({
  providers: [
    {
      provide: ApiClientService,
      useFactory: () => {
        const config: ApiClientConfig = {
          baseUrl: 'https://challenge.crossmint.io/api',
          candidateId: '58b1e8e6-71b6-4f64-b00e-c48b8eeb209b',
        };
        return new ApiClientService(config);
      },
    },
  ],
  exports: [ApiClientService],
})
export class ApiClientModule {}

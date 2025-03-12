import { Module } from '@nestjs/common';
import * as Commands from './commands';
import { ApiClientModule } from './modules/api-client/api-client.module';

@Module({
  imports: [ApiClientModule],
  providers: [...Object.values(Commands)],
})
export class AppModule {}

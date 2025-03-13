import { Module } from '@nestjs/common';
import { ChallengesModule } from '@modules/challenges';

@Module({
  imports: [ChallengesModule],
})
export class AppModule {}

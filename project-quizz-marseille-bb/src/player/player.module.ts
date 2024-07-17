import { Module } from '@nestjs/common';
import { PlayerService } from './services/player.service';
import { PlayerController } from './controller/player.controller';

@Module({
  controllers: [PlayerController],
  providers: [PlayerService],
})
export class PlayerModule {}

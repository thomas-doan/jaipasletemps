// player/player.module.ts
import { Module } from '@nestjs/common';
import { PlayerService } from './services/player.service';
import { DatabaseModule } from '../database/database.module';
import {PlayerController} from "./controllers/player.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [PlayerController],
  providers: [
    {
      provide: 'IPlayerService',
      useClass: PlayerService,
    },
    PlayerService,
  ],
  exports: ['IPlayerService'],
})
export class PlayerModule {}

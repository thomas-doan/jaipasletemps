// player/player.module.ts
import { Module } from '@nestjs/common';
import { PlayerService } from './services/player.service';
import { DatabaseModule } from '../database/database.module';
import {PlayerController} from "./controllers/player.controller";
import {ScheduleModule} from "@nestjs/schedule";

@Module({
  imports: [DatabaseModule,ScheduleModule.forRoot()],
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

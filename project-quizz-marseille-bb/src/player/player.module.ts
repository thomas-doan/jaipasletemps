// player/player.module.ts
import { Module } from '@nestjs/common';
import { PlayerService } from './services/player.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
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

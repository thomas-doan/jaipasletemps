// game/game.module.ts
import { Module } from '@nestjs/common';
import { GameService } from './services/game.service';
import { DatabaseModule } from '../database/database.module';
import { PlayerModule } from '../player/player.module';
import { QuestionService } from '../question/services/question.service';
import { ScoreService } from './services/score.service';
import {PlayerService} from "./services/player.service";

@Module({
  imports: [DatabaseModule, PlayerModule],
  providers: [
    {
      provide: 'IGameService',
      useClass: GameService,
    },
    {
        provide: 'IPlayerService',
        useClass: PlayerService,

    },
    GameService,
    QuestionService,
    ScoreService,
  ],
  exports: ['IGameService', 'IPlayerService'],
})
export class GameModule {}

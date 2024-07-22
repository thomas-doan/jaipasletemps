// game/game.module.ts
import { forwardRef, Module } from '@nestjs/common';
import { GameService } from './services/game.service';
import { DatabaseModule } from '../database/database.module';
import { PlayerModule } from '../player/player.module';
import { QuestionService } from '../question/services/question.service';
import { ScoreService } from './services/score.service';
import { PlayerService } from './services/player.service';
import { WebsocketModule } from '../websocket/websocket.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => WebsocketModule)],

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
    PlayerService,
    QuestionService,
    ScoreService,
  ],
  exports: [
    'IGameService',
    'IPlayerService',
    GameService,
    PlayerService,
    ScoreService,
    QuestionService,
  ],
})
export class GameModule {}

// game/game.module.ts
import { Module } from '@nestjs/common';
import { GameService } from './services/game.service';
import { DatabaseModule } from '../database/database.module';
import { PlayerModule } from '../player/player.module';
import { QuestionService } from '../question/services/question.service';
import { ScoreService } from './services/score.service';
import { PlayerService } from './services/player.service';
import { QuestionModule } from 'src/question/question.module';

@Module({
  imports: [DatabaseModule, PlayerModule, QuestionModule],
  providers: [
    {
      provide: 'IGameService',
      useClass: GameService,
    },
    {
      provide: 'IPlayerService',
      useClass: PlayerService,
    },
    {
      provide: 'IQuestionService',
      useClass: QuestionService,
    },
    {
      provide: 'IScoreService',
      useClass: ScoreService,
    },
    GameService,
    QuestionService,
    ScoreService,
  ],
  exports: ['IGameService', 'IPlayerService', 'IScoreService'],
})
export class GameModule {}

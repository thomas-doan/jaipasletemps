import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { GameModule } from './game/game.module';
import { PlayerModule } from './player/player.module';
import { QuestionModule } from './question/question.module';
import { ThemeModule } from './theme/theme.module';
import { WebsocketModule } from './websocket/websocket.module';
import { QuizModule } from './quiz/quiz.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    GameModule,
    QuizModule,
    PlayerModule,
    QuestionModule,
    ThemeModule,
    WebsocketModule,
  ],
})
export class AppModule {}

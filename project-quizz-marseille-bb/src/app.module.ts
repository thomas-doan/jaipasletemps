import { Module } from '@nestjs/common';
import {DatabaseModule} from "./database/database.module";
import {ConfigModule} from "@nestjs/config";
import { AuthModule } from './auth/auth.module';
import { PlayerModule } from './player/player.module';
import { QuestionModule } from './question/question.module';
import { ThemeModule } from './theme/theme.module';
import { QuizModule } from './quiz/quiz.module';
import { WebsocketModule } from './websocket/websocket.module';
import { GameModule } from './game/game.module';
import { CrateQuizModule } from './crate-quiz/crate-quiz.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    PlayerModule,
    QuestionModule,
    ThemeModule,
    QuizModule,
    WebsocketModule,
    GameModule,
    CrateQuizModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

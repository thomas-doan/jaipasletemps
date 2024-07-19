import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { DatabaseService } from 'src/database/database.service';

@Module({
  controllers: [QuizController],
  providers: [QuizService, DatabaseService],
})
export class QuizModule {}

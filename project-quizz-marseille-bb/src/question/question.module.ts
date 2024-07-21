import { Module } from '@nestjs/common';
import { QuestionService } from './services/question.service';
import { QuestionController } from './controllers/question.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [QuestionController],
  providers: [
    QuestionService,
    { provide: 'IQuestionService', useClass: QuestionService },
  ],
  exports: ['IQuestionService', QuestionService],
})
export class QuestionModule {}

import {forwardRef, Module} from '@nestjs/common';
import { QuestionService } from './services/question.service';
import { QuestionController } from './controllers/question.controller';
import { DatabaseModule } from '../database/database.module';
import {WebsocketModule} from "../websocket/websocket.module";

@Module({
  imports: [DatabaseModule, DatabaseModule, forwardRef(() => WebsocketModule)],
  controllers: [QuestionController],
  providers: [
    QuestionService,
    { provide: 'IQuestionService', useClass: QuestionService },
  ],
  exports: ['IQuestionService', QuestionService],
})
export class QuestionModule {}

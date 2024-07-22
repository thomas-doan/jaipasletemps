import {forwardRef, Inject, Injectable} from '@nestjs/common';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { UpdateQuestionDto } from '../dto/update-question.dto';
import {IQuestionService} from "../interfaces/question.service.interface";
import {DatabaseService} from "../../database/database.service";
import {WebsocketService} from "../../websocket/services/websocket.service";
import {Question} from "@prisma/client";
import {GameQuestions} from "../../game/model/game-questions.model";

@Injectable()
export class QuestionService implements IQuestionService {

  constructor(
      private database: DatabaseService,
      @Inject(forwardRef(() => WebsocketService))
      private readonly websocketService: WebsocketService
  ) {}


  create(data: CreateQuestionDto): Promise<Question> {
    throw new Error('Method not implemented.');
  }

  findAll() {
    return `This action returns all question`;
  }

  findOne(id: number) {
    return `This action returns a #${id} question`;
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }

 async getQuestionByIndexAssociateWithChoice(indexCurrentNumber: number) {
     const gameQuestionsInstance =  GameQuestions.getInstance();
     return gameQuestionsInstance.getQuestionWithIndexAssociateChoice(indexCurrentNumber);
 }

  findQuestionsByTheme(themeId: string): Promise<Question[]> {
    return Promise.resolve([]);
  }

  async initizializeQuestions(quizId: string) {
      // need to include Answer
      const quizQuestions = await this.database.quizQuestion.findMany({
          where: {quizId},
            include: {
                question: {
                    include: {
                        answers: true,
                    },
                },
            },
      });

      if (quizQuestions.length === 0) {
          throw new Error('Quiz has no questions');
      }

      const questions = quizQuestions.map(q => q.question);
      const gameQuestionsInstance = GameQuestions.getInstance(this.database, questions);
      return gameQuestionsInstance;
  }
}

import {forwardRef, Inject, Injectable} from '@nestjs/common';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { UpdateQuestionDto } from '../dto/update-question.dto';
import {IQuestionService} from "../interfaces/question.service.interface";
import {DatabaseService} from "../../database/database.service";
import {WebsocketService} from "../../websocket/services/websocket.service";
import {Question} from "@prisma/client";

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

 async getQuestionByIndex(quizId: string, indexCurrentNumber: number): Promise<Question> {
 return Promise.resolve(undefined);
 }

  findQuestionsByTheme(themeId: string): Promise<Question[]> {
    return Promise.resolve([]);
  }

  initizializeQuestions(): Promise<void> {
    return Promise.resolve(undefined);
  }
}

import { Injectable } from '@nestjs/common';
import { IQuestionService } from '../interfaces/question.service.interface';
import { DatabaseService } from 'src/database/database.service';
import { CreateQuestionDto } from 'src/question/dto/create-question.dto';
import { Question } from '@prisma/client';

@Injectable()
export class QuestionService implements IQuestionService {
  constructor(private database: DatabaseService) {}

  async createQuestion(data: CreateQuestionDto): Promise<any> {
    await this.database.answer.create({
      data: {
        ...data,
        question: {},
      },
    });
  }

  async findQuestionsByTheme(themeId: string): Promise<Question[]> {
    return this.database.question.findMany({
      where: { themeId },
    });
  }
  async getCorrectAnswer(questionId: string): Promise<any> {
    const question = await this.database.question.findUnique({
      where: { id: questionId },
      include: { answers: true },
    });

    if (!question) {
      throw new Error(`Question with ID ${questionId} does not exist`);
    }

    return question;
  }
}

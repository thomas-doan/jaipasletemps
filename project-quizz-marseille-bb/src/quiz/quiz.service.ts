import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class QuizService {
  constructor(private database: DatabaseService) {}
  create(createQuizDto: CreateQuizDto) {
    return 'This action adds a new quiz';
  }

  findAll() {
    return `This action returns all quiz`;
  }

  findOne(id: number) {
    return `This action returns a #${id} quiz`;
  }

  update(id: number, updateQuizDto: UpdateQuizDto) {
    return `This action updates a #${id} quiz`;
  }

  remove(id: number) {
    return `This action removes a #${id} quiz`;
  }

  getQuiz(id: string) {
    return this.database.quiz.findUnique({
      where: { id },
      include: {
        questions: {
          include: {
            question: {
              select: {
                id: true,
                text: true,
                themeId: true,
                theme: true,
                quizzes: true,
                answers: true,
                themeQuestions: true,
              }
            }
          }
        },
      },
    });
  }
}

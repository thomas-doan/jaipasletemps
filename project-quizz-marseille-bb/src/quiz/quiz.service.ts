import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class QuizService {
  constructor(private readonly prisma: DatabaseService) {}

  async create(createQuizDto: CreateQuizDto) {
    const { name, description, difficulty, questions, themeIds, maxPlayers } = createQuizDto;

    const themes = await this.prisma.theme.findMany({
      where: {
        id: { in: themeIds },
      },
    });

    if (themes.length !== themeIds.length) {
      throw new Error('One or more themeIds are invalid');
    }

    return this.prisma.quiz.create({
      data: {
        name,
        description,
        difficulty,
        maxPlayers,
        themes: {
          connect: themeIds.map(id => ({ id })),
        },
        questions: {
          create: questions.map(question => ({
            question: {
              create: {
                text: question.text,
                correctAnswer: question.correctAnswer,
                answers: {
                  create: question.answers.map(answer => ({ text: answer.text })),
                },
              },
            },
          })),
        },
      },
    });
  }

  findAll() {
    return this.prisma.quiz.findMany();
  }

  findOne(id: string) {
    return this.prisma.quiz.findUnique({
      where: { id },
    });
  }

  update(id: string, updateQuizDto: UpdateQuizDto) {
    const { name, description, difficulty, questions, themeIds } = updateQuizDto;

    return this.prisma.quiz.update({
      where: { id },
      data: {
        name,
        description,
        difficulty,
        themes: {
          connect: themeIds.map(id => ({ id })),
        },
        questions: {
          deleteMany: {}, // Delete existing questions before updating
          create: questions.map(question => ({
            question: {
              create: {
                text: question.text,
                correctAnswer: question.correctAnswer,
                answers: {
                  create: question.answers.map(answer => ({ text: answer.text })),
                },
              },
            },
          })),
        },
      },
    });
  }

  remove(id: string) {
    return this.prisma.quiz.delete({
      where: { id },
    });
  }
}

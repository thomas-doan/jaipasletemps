import { Difficulty } from "@prisma/client";

class CreateAnswerDto {
  text: string;
}

class CreateQuestionDto {
  text: string;
  correctAnswer: string;
  answers: CreateAnswerDto[];
}

export class CreateQuizDto {
  name: string;
  description: string;
  difficulty: Difficulty;
  maxPlayers: number;
  questions: CreateQuestionDto[];
  themeIds: string[];
}
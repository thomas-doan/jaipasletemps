import { IsArray, IsEnum, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Difficulty } from '@prisma/client';

class CreateAnswerDto {
  @IsString()
  text: string;
}

class CreateQuestionDto {
  @IsString()
  text: string;

  @IsString()
  correctAnswer: string;

  @ValidateNested({ each: true })
  @Type(() => CreateAnswerDto)
  @IsArray()
  answers: CreateAnswerDto[];
}

export class CreateQuizDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsEnum(Difficulty)
  difficulty: Difficulty;

  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  @IsArray()
  questions: CreateQuestionDto[];

  @IsArray()
  @IsString({ each: true })
  themeIds: string[];
}

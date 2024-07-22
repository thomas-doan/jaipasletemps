import { IsArray, IsEnum, IsInt, IsNotEmpty, IsString, ValidateNested, isNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { Difficulty } from '@prisma/client';

class CreateAnswerDto {
  @IsString()
  @IsNotEmpty()
  text: string;
}

class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsString()
  @IsNotEmpty()
  correctAnswer: string;

  @ValidateNested({ each: true })
  @Type(() => CreateAnswerDto)
  @IsArray()
  answers: CreateAnswerDto[];
}

export class CreateQuizDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(Difficulty)
  @IsNotEmpty()
  difficulty: Difficulty;

  @IsInt()
  @IsNotEmpty()
  maxPlayers: number

  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  @IsArray()
  @IsNotEmpty()
  questions: CreateQuestionDto[];

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  themeIds: string[];
}

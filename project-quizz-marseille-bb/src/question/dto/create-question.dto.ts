import { CreateAnswerDto } from './create-answer.dto';

export class CreateQuestionDto {
    text: string;
    correctAnswer: string;
    themeId: string;
    answers: CreateAnswerDto[];
}

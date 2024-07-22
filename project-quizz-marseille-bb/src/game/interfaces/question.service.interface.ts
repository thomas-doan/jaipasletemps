import { Question } from '@prisma/client';
import { CreateQuestionDto } from '../../question/dto/create-question.dto';

export interface IQuestionService {
    createQuestion(data: CreateQuestionDto): Promise<Question>;
    findQuestionsByTheme(themeId: string): Promise<Question[]>;
    getQuestionByIndex(quizId: string, indexCurrentNumber: number): Promise<Question>;
}

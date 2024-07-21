import { Question } from '@prisma/client';
import { CreateQuestionDto } from '../dto/create-question.dto';

export interface IQuestionService {
    initizializeQuestions(): Promise<void>;
    create(data: CreateQuestionDto): Promise<Question>;
    findQuestionsByTheme(themeId: string): Promise<Question[]>;
    getQuestionByIndex(quizId: string, indexCurrentNumber: number): Promise<Question>;
}

import { Question } from '@prisma/client';
import { CreateQuestionDto } from '../dto/create-question.dto';
import {GameQuestions} from "../../game/model/game-questions.model";

export interface IQuestionService {
    initizializeQuestions(quizId: string): Promise<GameQuestions>;
    create(data: CreateQuestionDto): Promise<Question>;
    findQuestionsByTheme(themeId: string): Promise<Question[]>;
    getQuestionByIndexAssociateWithChoice(indexCurrentNumber: number): Promise<Question>;
}

import { Question } from '@prisma/client';
import { DatabaseService } from "../../database/database.service";

export class GameQuestions {
    private static instance: GameQuestions;
    private questions: Question[];

    private constructor(private readonly database: DatabaseService, questions: Question[]) {
        this.questions = questions;
    }

    public static getInstance(database?: DatabaseService, questions?: Question[]): GameQuestions {
        if (!GameQuestions.instance && database && questions) {
            GameQuestions.instance = new GameQuestions(database, questions);
        }
        return GameQuestions.instance;
    }

    public getQuestionWithIndexAssociateChoice(index: number) {
        const adaptedIndex = this.adapterIndex(index);
        if (adaptedIndex < 0 || adaptedIndex >= this.questions.length) {
            return null;
        }
        return this.questions[adaptedIndex];
    }

    private adapterIndex(index: number): number {
        return index - 1;
    }

    public getTotalQuestions(): number {
        return this.questions.length;
    }

    public getQuestions(): Question[] {
        return this.questions;
    }
}

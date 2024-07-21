import { Question } from '@prisma/client';

export class GameQuestions {
    private static instance: GameQuestions;
    private questions: Question[];

    constructor(questions: Question[]) {
        this.questions = questions;
    }

    public static getInstance(questions: Question[]): GameQuestions {
        if (!GameQuestions.instance) {
            GameQuestions.instance = new GameQuestions(questions);
        }
        return GameQuestions.instance;
    }

    public getQuestionWithIndex(index: number): Question {
        index = this.adapterIndex(index);
        return this.questions[index];
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

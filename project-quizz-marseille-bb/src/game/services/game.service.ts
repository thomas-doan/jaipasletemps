import {Inject, Injectable} from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { IGameService } from '../interfaces/game.service.interface';
import { PlayerService } from './player.service';
import { ScoreService } from './score.service';
import {Game, Quiz} from '@prisma/client';
import { QuestionService } from "../../question/services/question.service";
import {IPlayerService} from "../interfaces/player.service.interface";

@Injectable()
export class GameService implements IGameService {
    private receivedAnswers: Map<string, { playerId: string; isCorrect: boolean }[]> = new Map();

    constructor(
        private database: DatabaseService,
        @Inject('IPlayerService') private readonly playerService: IPlayerService,
        private questionService: QuestionService,
        private scoreService: ScoreService,
    ) {}

    async create(quizId: string, playerName: string, userId: string): Promise<Game> {
        const quiz = await this.database.quiz.findUnique({ where: { id: quizId } });
        if (!quiz) {
            throw new Error('Quiz not found');
        }

        const totalQuestions = await this.database.quizQuestion.count({ where: { quizId } });
        const game = await this.database.game.create({
            data: {
                quizId: quizId,
                name: quiz.name,
                description: quiz.description,
                total_question: totalQuestions,
                score: {},
                ownerGameId: userId,
                status: 'OPEN',
                joker_used: {},
                disconnected_players: {},
                current_question: 0,
            },
        });

        return game;
    }
    async startGame(gameId: string): Promise<void> {
    }

    async restartGame(gameId: string): Promise<void> {
    }

    async endGame(gameId: string): Promise<void> {
        await this.database.game.delete({ where: { id: gameId } });
    }

    async showQuestion(gameId: string): Promise<any> {
    }

    async showAnswer(gameId: string): Promise<any> {
    }

    async answerQuestion(gameId: string, playerId: string, answers: string[]): Promise<boolean[]> {
        return [true];
    }

    async closeChoice(gameId: string): Promise<void> {
    }

    async getScores(gameId: string): Promise<any> {
    }

    async findGameById(gameId: string): Promise<Game> {

        return {} as Game;
    }

    async checkAnswer(game: Game, answers: string[]): Promise<boolean> {
        return true;
    }
}
import {Injectable, Inject, forwardRef} from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { IGameService } from '../interfaces/game.service.interface';
import { IPlayerService } from '../interfaces/player.service.interface';
import { QuestionService } from '../../question/services/question.service';
import { ScoreService } from './score.service';
import {Game, Status} from '@prisma/client';
import {WebsocketService} from "../../websocket/services/websocket.service";
import {GameQuestions} from "../model/game-questions.model";
import {Score} from "../model/score.model";

@Injectable()
export class GameService implements IGameService {
    private gameIntervals: Map<string, NodeJS.Timeout> = new Map();

    constructor(
        @Inject(forwardRef(() => WebsocketService))
        private readonly websocketService: WebsocketService,
        @Inject('IPlayerService') private readonly playerService: IPlayerService,
        private readonly database: DatabaseService,
        private readonly questionService: QuestionService,
        private readonly scoreService: ScoreService,


    ) {
    }

    async create(quizId: string, playerName: string, userId: string): Promise<Game> {
        const quiz = await this.database.quiz.findUnique({
            where: { id: quizId },
        });

        if (!quiz) {
            throw new Error('Quiz not found');
        }
        const gameQuestions = await this.initializeGameQuestion(quizId);

        const game = await this.database.game.create({
            data: {
                quizId,
                name: quiz.name,
                description: quiz.description,
                total_question: gameQuestions.getTotalQuestions(),
                score: {},
                ownerGameId: userId,
                status: 'OPEN',
                joker_used: {},
                disconnected_players: {},
                current_question: 0,
            },
        });

        const getUser = await this.database.player.findFirst({
            where: { userId: userId },
        });

        if (!getUser) {
            throw new Error('Player not found');
        }

        try {
            await this.database.playerActivites.create({
                data: {
                    playerId: getUser.id,
                    gameId: game.id,
                },
            });
        }
        catch (e) {
            console.log('error', e);
        }

        return game;
    }

    private async initializeGameQuestion(quizId: string) {
        const quizQuestions = await this.database.quizQuestion.findMany({
            where: {quizId},
            include: {question: true},
        });

        if (quizQuestions.length === 0) {
            throw new Error('Quiz has no questions');
        }

        const questions = quizQuestions.map(q => q.question);
        const gameQuestionsInstance = GameQuestions.getInstance(questions);
        return gameQuestionsInstance;
    }

    async startGame(gameId: string): Promise<void> {
        const server = this.websocketService.getServer();
        const game = await this.findGameWithQuizById(gameId);
        if (!game) {
            throw new Error('Game not found');
        }


        const players = await this.database.playerActivites.findMany({
            where: { gameId: gameId },
            select: {
                playerId: true,
            },
        })
        const scoreInstance = Score.getInstance(players);



        await this.database.game.update({
            where: { id: game.id },
            data: {
                status: Status.IN_PROGRESS,
                current_question: 1,
                score: scoreInstance.getScoreJsonFormated(),
            },
        });

 /*       this.sendNextQuestion(game.id, server);
        const interval = setInterval(() => {
            this.sendNextQuestion(game.id, server);
        }, 30000);

        this.gameIntervals.set(game.id, interval);*/
    }

    async sendNextQuestion(gameId: string, server: any): Promise<void> {
        const game = await this.findGameById(gameId);
        if (!game) {
            throw new Error('Game not found');
        }

        if (game.current_question > game.total_question) {
            clearInterval(this.gameIntervals.get(gameId) as unknown as number);

            game.status = 'FINISHED';
            await this.database.game.update({
                where: { id: gameId },
                data: {
                    status: 'FINISHED',
                },
            });
            server.to(gameId).emit('end', { message: 'Game over', score: game.score });
            return;
        }

        const question = await this.questionService.getQuestionByIndex(game.quizId, game.current_question);
        server.to(gameId).emit('question', question);

        await this.database.game.update({
            where: { id: gameId },
            data: {
                current_question: game.current_question + 1,
            },
        });
    }

    async restartGame(gameId: string): Promise<void> {
        // Implementation for restarting the game
    }

    async endGame(gameId: string): Promise<void> {
        clearInterval(this.gameIntervals.get(gameId) as unknown as number);
        this.gameIntervals.delete(gameId);
        await this.database.game.delete({
            where: { id: gameId },
        });
    }

    async showQuestion(gameId: string): Promise<any> {
        // Implementation for showing the question
    }

    async showAnswer(gameId: string): Promise<any> {
        // Implementation for showing the answer
    }

    async answerQuestion(gameId: string, playerId: string, answers: string[]): Promise<boolean[]> {
        // Implementation for answering the question
        return [true];
    }

    async closeChoice(gameId: string): Promise<void> {
        // Implementation for closing choice
    }

    async getScores(gameId: string): Promise<any> {
        // Implementation for getting scores
    }

    async findGameById(gameId: string): Promise<Game> {
        return this.database.game.findUnique({
            where: { id: gameId },
        });
    }

    async checkAnswer(game: Game, answers: string[]): Promise<boolean> {
        // Implementation for checking answer
        return true;
    }

    async findGameWithQuizById(gameId: string): Promise<(Game & { quiz: { maxPlayers: number } }) | null> {
        return this.database.game.findUnique({
            where: { id: gameId },
            include: {
                quiz: {
                    select: {
                        maxPlayers: true,
                    },
                },
            },
        });
    }
}

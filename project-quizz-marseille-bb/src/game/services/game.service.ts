import {Injectable, Inject, forwardRef, Logger} from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { IGameService } from '../interfaces/game.service.interface';
import { IPlayerService } from '../interfaces/player.service.interface';
import { QuestionService } from '../../question/services/question.service';
import { ScoreService } from './score.service';
import {Game, Status} from '@prisma/client';
import {WebsocketService} from "../../websocket/services/websocket.service";
import {Score} from "../model/score.model";
import {WebSocketEvents} from "../../websocket/enum/websocket-events.enum";
import {SchedulerRegistry} from "@nestjs/schedule";
import { CronJob } from 'cron';

@Injectable()
export class GameService implements IGameService {
    private gameIntervals: Map<string, NodeJS.Timeout> = new Map();
    private readonly logger = new Logger(GameService.name);
    public firstCorrectAnswer: { [gameId: string]: string | null } = {};

    constructor(
        @Inject(forwardRef(() => WebsocketService))
        private readonly websocketService: WebsocketService,
        @Inject('IPlayerService') private readonly playerService: IPlayerService,
        private readonly database: DatabaseService,
        private readonly questionService: QuestionService,
        private readonly scoreService: ScoreService,
        private readonly schedulerRegistry: SchedulerRegistry,


    ) {
    }

    async create(quizId: string, playerName: string, userId: string): Promise<Game> {
        const quiz = await this.database.quiz.findUnique({
            where: { id: quizId },
        });

        if (!quiz) {
            throw new Error('Quiz not found');
        }
        const gameQuestions = await this.questionService.initizializeQuestions(quizId);

        const game = await this.database.game.create({
            data: {
                quizId,
                name: quiz.name,
                description: quiz.description,
                total_question: gameQuestions.getTotalQuestions(),
                score: {},
                ownerGameId: userId,
                status: Status.OPEN,
                joker_used: {},
                disconnected_players: {},
                current_question: 1,
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

/*    private async initializeGameQuestion(quizId: string) {
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
    }*/

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
                score: scoreInstance.getScoreJsonFormated(),
            },
        });


           await this.showNextQuestion(game.id);
    }

    async showNextQuestion(gameId: string): Promise<void> {
        this.logger.log('showNextQuestion');
        let game = await this.findGameById(gameId);
        if (!game) {
            throw new Error('Game not found');
        }

        this.firstCorrectAnswer[gameId] = null;

        this.logger.log(`question index: ${game.current_question}`);
        const question = await this.questionService.getQuestionByIndexAssociateWithChoice(game.current_question);
        this.logger.log('questionEncoursDanslaBoucle', question);

        if (!question) {
            throw new Error('Question not found');
        }

        this.websocketService.getServer().to(gameId).emit(WebSocketEvents.SHOW_NEXT_QUESTION, question);

        this.scheduleScoreUpdate(gameId, 10);
        this.scheduleNextQuestion(gameId, 20);
    }

    private scheduleScoreUpdate(gameId: string, seconds: number) {
        const job = new CronJob(new Date(Date.now() + seconds * 1000), async () => {
            const scoreInstance = Score.getInstance().getScoreJsonFormated();
            this.logger.log(`Scores pour le jeu ${gameId}:`, scoreInstance);
            this.schedulerRegistry.deleteCronJob(`scoreUpdate-${gameId}`);
        });

        this.schedulerRegistry.addCronJob(`scoreUpdate-${gameId}`, job);
        job.start();
    }

    private scheduleNextQuestion(gameId: string, seconds: number) {
        const job = new CronJob(new Date(Date.now() + seconds * 1000), async () => {
            let game = await this.findGameById(gameId);
            await this.database.game.update({
                where: { id: gameId },
                data: {
                    current_question: game.current_question + 1,
                },
            });

            game = await this.findGameById(gameId);
            if (game && game.current_question <= game.total_question) {
                this.showNextQuestion(gameId);
            } else {
                await this.database.game.update({
                    where: { id: gameId },
                    data: {
                        status: Status.FINISHED,
                    },
                });
                await this.scoreService.insertScoreAndHistoryOfgame(gameId);
                this.websocketService.getServer().to(gameId).emit('end', { message: 'Game over', score: game.score });
            }
            this.schedulerRegistry.deleteCronJob(`nextQuestion-${gameId}`);
        });

        this.schedulerRegistry.addCronJob(`nextQuestion-${gameId}`, job);
        job.start();
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

    async answerQuestion(gameId: string, playerId: string, answers: string[]): Promise<boolean> {
        const game = await this.database.game.findUnique({
            where: { id: gameId },
        });

        if (!game) {
            throw new Error('Game not found');
        }

        const currentQuestion = await this.questionService.getQuestionByIndexAssociateWithChoice(game.current_question);

        if (!currentQuestion) {
            throw new Error('Question not found');
        }

        const isCorrect = answers.includes(currentQuestion.correctAnswer);

        if (isCorrect) {
            const scoreInstance = Score.getInstance();
            scoreInstance.updateScore(playerId);

            await this.database.game.update({
                where: { id: gameId },
                data: {
                    score: scoreInstance.getScoreJsonFormated(),
                },
            });
        }

        return isCorrect;
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

    async getAllGamesWithStatusOpen(): Promise<Game[]> {
        return this.database.game.findMany({
            where: { status: Status.OPEN },
        });
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

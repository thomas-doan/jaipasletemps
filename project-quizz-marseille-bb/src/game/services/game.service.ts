import {Injectable, Inject, forwardRef} from '@nestjs/common';
import {DatabaseService} from '../../database/database.service';
import {IGameService} from '../interfaces/game.service.interface';
import {IPlayerService} from '../interfaces/player.service.interface';
import {QuestionService} from '../../question/services/question.service';
import {ScoreService} from './score.service';
import {Game, Status} from '@prisma/client';
import {WebsocketService} from "../../websocket/services/websocket.service";
import {Score} from "../model/score.model";
import {WebSocketEvents} from "../../websocket/enum/websocket-events.enum";

@Injectable()
export class GameService implements IGameService {
    private gameIntervals: Map<string, NodeJS.Timeout> = new Map();
    public firstCorrectAnswer: { [gameId: string]: string | null } = {};

    constructor(
        @Inject(forwardRef(() => WebsocketService))
        private readonly websocketService: WebsocketService,
        @Inject('IPlayerService') private readonly playerService: IPlayerService,
        private readonly database: DatabaseService,
        private readonly questionService: QuestionService,
        private readonly scoreService: ScoreService,
    ) {
    }

    async create(quizId: string, gameName: string, userId: string): Promise<Game> {
        const quiz = await this.database.quiz.findUnique({
            where: {id: quizId},
        });

        if (!quiz) {
            throw new Error('Quiz not found');
        }
        const gameQuestions = await this.questionService.initizializeQuestions(quizId);

        const game = await this.database.game.create({
            data: {
                quizId,
                name: gameName,
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
            where: {userId: userId},
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
        } catch (e) {
            console.log('error', e);
        }

        return game;
    }

    async startGame(gameId: string): Promise<void> {
        const game = await this.findGameWithQuizById(gameId);
        if (!game) {
            throw new Error('Game not found');
        }

        const players = await this.database.playerActivites.findMany({
            where: {gameId: gameId},
            select: {
                playerId: true,
            },
        })
        const scoreInstance = Score.getInstance(players);

        await this.database.game.update({
            where: {id: game.id},
            data: {
                status: Status.IN_PROGRESS,
                score: scoreInstance.getScoreJsonFormated(),
            },
        });

        await this.showNextQuestion(gameId);
    }


    async showNextQuestion(gameId: string): Promise<void> {
        let game = await this.findGameById(gameId);
        if (!game) {
            throw new Error('Game not found');
        }

        // Fonction pour gérer l'envoi des questions et des scores
        const handleQuestion = async (index: number) => {
            if (index > game.total_question) {
                // Fin du jeu
                await this.database.game.update({
                    where: {id: gameId},
                    data: {
                        status: Status.FINISHED,
                    },
                });
                await this.scoreService.insertScoreAndHistoryOfgame(gameId);
                this.websocketService.getServer().to(gameId).emit(WebSocketEvents.END_GAME, {
                    message: 'Game over',
                    score: game.score
                });
                return;
            }

            const question = await this.questionService.getQuestionByIndexAssociateWithChoice(index);
            if (!question) {
                throw new Error('Question not found');
            }

            // Envoi de la question
            await this.showFirstQuestion(gameId, question);

            // Mise à jour de la question actuelle
            await this.database.game.update({
                where: {id: gameId},
                data: {
                    current_question: index,
                },
            });

            // Attente de 15 secondes avant d'envoyer les scores et la prochaine question
            setTimeout(async () => {
                const scoreInstance = Score.getInstance().getScoreJsonFormated();
                this.websocketService.getServer().to(gameId).emit(WebSocketEvents.SHOW_SCORE, scoreInstance);

                // Appel récursif pour la prochaine question
                await handleQuestion(index + 1);
            }, 15000);
        };

        // Démarrage avec la première question après un délai de 1ms
        setTimeout(() => handleQuestion(game.current_question), 1);
    }

    async showFirstQuestion(gameId: string, question: any): Promise<void> {
        this.websocketService.getServer().to(gameId).emit(WebSocketEvents.SHOW_NEXT_QUESTION, question);

    }

    async restartGame(gameId: string): Promise<void> {
        // Implementation for restarting the game
    }

    async endGame(gameId: string): Promise<void> {
        clearInterval(this.gameIntervals.get(gameId) as unknown as number);
        this.gameIntervals.delete(gameId);
        await this.database.game.delete({
            where: {id: gameId},
        });
    }

    async answerQuestion(gameId: string, playerId: string, answers: string[]): Promise<boolean> {
        const game = await this.database.game.findUnique({
            where: {id: gameId},
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
                where: {id: gameId},
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
            where: {id: gameId},
        });
    }

    async checkAnswer(game: Game, answers: string[]): Promise<boolean> {
        // Implementation for checking answer
        return true;
    }


    async getAllGamesWithStatusOpen(): Promise<Game[]> {
        return this.database.game.findMany({
            where: { status: Status.OPEN },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findGameWithQuizById(gameId: string): Promise<(Game & { quiz: { maxPlayers: number } }) | null> {
        return this.database.game.findUnique({
            where: {id: gameId},
            include: {
                quiz: {
                    select: {
                        maxPlayers: true,
                    },
                },
            },
        });
    }

    async getActiveRooms(): Promise<string[]> {
        const server = this.websocketService.getServer();
        const rooms = server.sockets.adapter.rooms;
        const activeRooms = [];

        for (const [roomId, room] of rooms.entries()) {
            if (
                room.size > 1 ||
                (room.size === 1 && !server.sockets.sockets.has(roomId))
            ) {
                const gameData = await this.findGameById(roomId);
                activeRooms.push(gameData);
            }
        }

        return activeRooms;
    }
}

import { Game } from '@prisma/client';

export interface IGameService {
    create(quizId: string, gameName:string, userId: string): Promise<Game>;
    startGame(gameId: string): Promise<void>;
    restartGame(gameId: string): Promise<void>;
    answerQuestion(gameId: string, playerId: string, answer: string): Promise<boolean>;
    endGame(gameId: string): Promise<void>;
    showNextQuestion(gameId: string): Promise<void>;
    getScores(gameId: string): Promise<any>;
    findGameById(gameId: string): Promise<Game>;
    checkAnswer(game: Game, answers: string[]): Promise<boolean>;
    findGameWithQuizById(gameId: string): Promise<Game & { quiz: { maxPlayers: number } }>;
    getActiveRooms(): Promise<any>;
    getAllGamesWithStatusOpen(): Promise<Game[]>;
    firstCorrectAnswer: { [gameId: string]: string | null };
}

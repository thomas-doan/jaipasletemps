import { Game } from '@prisma/client';

export interface IGameService {
    create(quizId: string, playerName: string, userId: string): Promise<Game>;
    startGame(gameId: string): Promise<void>;
    restartGame(gameId: string): Promise<void>;
    endGame(gameId: string): Promise<void>;
    showQuestion(gameId: string): Promise<any>;
    showAnswer(gameId: string): Promise<any>;
    getScores(gameId: string): Promise<any>;
    findGameById(gameId: string): Promise<Game>;
    checkAnswer(game: Game, answers: string[]): Promise<boolean>;
    findGameWithQuizById(gameId: string): Promise<Game & { quiz: { maxPlayers: number } }>;
}

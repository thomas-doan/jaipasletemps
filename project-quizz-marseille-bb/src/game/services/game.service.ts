import { Injectable, Inject } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { IGameService } from '../interfaces/game.service.interface';
import { IPlayerService } from '../interfaces/player.service.interface';
import { QuestionService } from '../../question/services/question.service';
import { ScoreService } from './score.service';
import { Game } from '@prisma/client';

@Injectable()
export class GameService implements IGameService {
  private receivedAnswers: Map<
    string,
    { playerId: string; isCorrect: boolean }[]
  > = new Map();

  constructor(
    private readonly database: DatabaseService,
    @Inject('IPlayerService') private readonly playerService: IPlayerService,
    private readonly questionService: QuestionService,
    private readonly scoreService: ScoreService,
  ) {}

  async create(
    quizId: string,
    gameName: string,
    playerId: string,
    userId: string,
  ): Promise<Game> {
    const quiz = await this.database.quiz.findUnique({
      where: { id: quizId },
    });

    if (!quiz) {
      throw new Error('Quiz not found');
    }

    const totalQuestions = await this.database.quizQuestion.count({
      where: { quizId },
    });

    const game = await this.database.game.create({
      data: {
        quizId,
        name: gameName,
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

    const getUser = await this.database.player.findFirst({
      where: { id: playerId },
    });

    if (!getUser) {
      throw new Error('Player not found');
    }

    await this.database.playerActivites.create({
      data: {
        playerId: getUser.id,
        gameId: game.id,
      },
    });

    return game;
  }

  async playerInGame(gameId: string): Promise<any> {
    const players = await this.database.playerActivites.findMany({
      where: { gameId },
      select: {
        playerId: true,
      },
    });

    return players;
  }

  async startGame(gameId: string): Promise<void> {
    // Implementation for starting the game
  }

  async restartGame(gameId: string): Promise<void> {
    // Implementation for restarting the game
  }

  async endGame(gameId: string): Promise<void> {
    await this.database.game.delete({ where: { id: gameId } });
  }

  async leaveGame(gameId: string, playerId: string): Promise<void> {
    await this.database.playerActivites.delete({
      where: { playerId_gameId: { playerId, gameId } },
    });
  }
  async showQuestion(gameId: string): Promise<any> {
    // Implementation for showing the question
  }

  async showAnswer(gameId: string): Promise<any> {
    // Implementation for showing the answer
  }

  async answerQuestion(
    gameId: string,
    playerId: string,
    answers: string[],
  ): Promise<boolean[]> {
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
    // Implementation for finding game by ID
    return {} as Game;
  }

  async checkAnswer(game: Game, answers: string[]): Promise<boolean> {
    // Implementation for checking answer
    return true;
  }

  async findGameWithQuizById(
    gameId: string,
  ): Promise<Game & { quiz: { maxPlayers: number } }> {
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

  async getActiveGames(activeRooms: string[]): Promise<Game[]> {
    const games = [];
    for (const roomId of activeRooms) {
      const game = await this.database.game.findUnique({
        where: { id: roomId },
      });
      if (game) {
        games.push(game);
      }
    }
    return games;
  }
}

import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { IScoreService } from '../interfaces/score.service.interface';

@Injectable()
export class ScoreService implements IScoreService {
  constructor(private database: DatabaseService) {}

  async updateScore(gameId: string, playerId: string): Promise<void> {
    const game = await this.database.game.findUnique({
      where: { id: gameId },
    });
    const scores = JSON.parse(String(game.score));

    const playerIndex = scores.findIndex(
      (score) => score.playerId === playerId,
    );

    if (playerIndex > -1) {
      scores[playerIndex].points += 1;
    } else {
      scores.push({ playerId: playerId, points: 1 });
    }

    await this.database.game.update({
      where: { id: gameId },
      data: { score: JSON.stringify(scores) },
    });
  }
  async getScoreGame(gameId: string): Promise<any> {
    return this.database.game.findUnique({
      where: { id: gameId },
      select: { score: true },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { IPlayerService } from '../interfaces/player.service.interface';
import { Player, User } from '@prisma/client';

@Injectable()
export class PlayerService implements IPlayerService {
  constructor(private database: DatabaseService) {}

  async addPlayer(gameId: string, playerId: string): Promise<Player> {
    const player = await this.database.player.findUnique({
      where: { id: playerId },
    });

    if (!player) {
      throw new Error(`Player with ID ${playerId} does not exist`);
    }

    const game = await this.database.game.findUnique({
      where: { id: gameId },
    });

    if (!game) {
      throw new Error(`Game with ID ${gameId} does not exist`);
    }

    await this.database.playerActivites.create({
      data: {
        playerId,
        gameId,
      },
    });

    return player;
  }

  async getPlayersInGame(gameId: string): Promise<(Player & { user: User })[]> {
    const activities = await this.database.playerActivites.findMany({
      where: { gameId },
      include: {
        player: {
          include: {
            user: true,
          },
        },
      },
    });

    return activities.map((activity) => ({
      ...activity.player,
      user: activity.player.user,
    }));
  }

  async handleDisconnection(playerId: string): Promise<void> {}

  async handleReconnection(playerId: string): Promise<void> {}
}

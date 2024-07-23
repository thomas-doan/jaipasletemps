import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { IPlayerService } from '../interfaces/player.service.interface';
import { Player } from '@prisma/client';
import { WebsocketService } from '../../websocket/services/websocket.service';

@Injectable()
export class PlayerService implements IPlayerService {
  constructor(
    private database: DatabaseService,
    @Inject(forwardRef(() => WebsocketService))
    private readonly websocketService: WebsocketService,
  ) {}

  async addPlayer(
    gameId: string,
    playerName: string,
    userId: string,
  ): Promise<Player> {
    const getUser = await this.database.user.findUnique({
      where: { id: userId },
    });

    let getPlayer = await this.database.player.findFirst({
      where: { userId: getUser.id },
    });

    if (!getPlayer) {
      getPlayer = await this.database.player.create({
        data: {
          name: playerName,
          userId: getUser.id,
        },
      });
    }

    const findPlayerInPlayerActivites =
      await this.database.playerActivites.findFirst({
        where: {
          AND: [{ playerId: getPlayer.id }, { gameId: gameId }],
        },
      });

    if (!findPlayerInPlayerActivites) {
      await this.database.playerActivites.create({
        data: {
          gameId,
          playerId: getPlayer.id,
        },
      });
    }

    const server = this.websocketService.getServer();
    const clients = server.sockets.adapter.rooms.get(gameId);
    const socketIds = clients ? Array.from(clients) : [];
    console.log(`Socket IDs in room ${gameId}:`, socketIds);

    return getPlayer;
  }

  async getPlayersInGame(gameId: string): Promise<Player[]> {
    const activities = await this.database.playerActivites.findMany({
      where: { gameId },
      include: { player: true },
    });

    return activities.map((activity) => activity.player);
  }

  async handleDisconnection(playerId: string): Promise<void> {}

  async handleReconnection(playerId: string): Promise<void> {}

}

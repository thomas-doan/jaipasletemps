import { Injectable, Inject } from '@nestjs/common';
import { IGameEventsHandler } from '../interfaces/game-events.handler.interface';
import { IGameService } from '../../game/interfaces/game.service.interface';
import { Server, Socket } from 'socket.io';
import { GameUtilsService } from '../services/gameUtils.service';

@Injectable()
export class CreateRoomHandler implements IGameEventsHandler {
  constructor(
    @Inject('IGameService') private readonly gameService: IGameService,
    private readonly gameUtilsService: GameUtilsService,
  ) {}

  async handle(
    socket: Socket,
    data: {
      event: string;
      data: {
        quizId: string;
        gameName: string;
        playerId: string;
        userId: string;
      };
    },
    server: Server,
  ): Promise<void> {
    console.log('CreateRoomHandler received data:', data);
    const { quizId, gameName, playerId, userId } = data.data;

    if (!quizId || !gameName || !playerId || !userId) {
      console.error('Invalid data received:', data);
      socket.emit('error', 'Invalid data received');
      return;
    }

    try {
      const game = await this.gameService.create(
        quizId,
        gameName,
        playerId,
        userId,
      );
      console.log('Game created:', game);

      try {
        await socket.join(game.id);
        console.log(`Socket ${socket.id} joined room ${game.id}`);
        socket.emit('roomCreated', { roomId: game.id, quizId: game.quizId });
        console.log(`Emitted roomCreated event with roomId ${game.id}`);

        const activeRooms = await this.gameUtilsService.getActiveRooms(server);
        if (activeRooms.length > 0) {
          const activeGames =
            await this.gameService.getActiveGames(activeRooms);
          console.log('Active rooms:', activeGames);
          server.emit('activeRoomsList', activeGames);
        } else {
          console.log('No active rooms');
        }
      } catch (err) {
        console.error(`Error joining room ${game.id}:`, err);
        socket.emit('error', 'Error joining room');
      }
    } catch (error) {
      console.error('Error creating game:', error);
      socket.emit('error', 'Error creating game');
    }
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { IGameEventsHandler } from '../interfaces/game-events.handler.interface';
import { IGameService } from '../../game/interfaces/game.service.interface';
import { Server, Socket } from 'socket.io';

@Injectable()
export class CreateRoomHandler implements IGameEventsHandler {
  constructor(
    @Inject('IGameService') private readonly gameService: IGameService,
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
        
        const rooms = server.sockets.adapter.rooms;
        const activeRooms = [];
        
        // Parcourir toutes les salles
        for (const [roomId, room] of rooms.entries()) {
            // Vérifier si la salle n'est pas une salle "privée" (c'est-à-dire, pas juste un socket individuel)
            if (room.size > 1 || (room.size === 1 && !server.sockets.sockets.has(roomId))) {
                activeRooms.push(roomId);
            }
        }
        
        console.log('Active rooms:', activeRooms);
        server.emit('activeRoomsList', activeRooms);
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

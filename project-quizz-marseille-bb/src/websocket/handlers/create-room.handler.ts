import {Injectable, Inject} from '@nestjs/common';
import { IGameEventsHandler } from '../interfaces/game-events.handler.interface';
import { IGameService } from '../../game/interfaces/game.service.interface';
import { Socket } from 'socket.io';

@Injectable()
export class CreateRoomHandler implements IGameEventsHandler {
  constructor(
    @Inject('IGameService') private readonly gameService: IGameService,
  ) {}

  async handle(
    socket: Socket,
    data: { event: string; data: { quizId: string; userId: string } },
  ): Promise<void> {
    console.log('CreateRoomHandler received data:', data);
    const { quizId, userId } = data.data;

    if (!quizId || !userId) {
      console.error('Invalid data received:', data);
      socket.emit('error', 'Invalid data received');
      return;
    }
    try {
      const game = await this.gameService.create(quizId, userId);
      console.log('Game created:', game);

      try {
        await socket.join(game.id);
        console.log(`Socket ${socket.id} joined room ${game.id}`);
        socket.emit('roomCreated', { roomId: game.id });
        console.log(`Emitted roomCreated event with roomId ${game.id}`);


        const activeRooms = await this.gameService.getActiveRooms();
        socket.broadcast.emit('activeRooms', activeRooms);

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

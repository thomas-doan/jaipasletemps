import { Inject, Injectable } from '@nestjs/common';
import { IGameEventsHandler } from '../interfaces/game-events.handler.interface';
import { IGameService } from '../../game/interfaces/game.service.interface';
import { Socket } from 'socket.io';

@Injectable()
export class StartGameHandler implements IGameEventsHandler {
  constructor(
    @Inject('IGameService') private readonly gameService: IGameService,
  ) {}

  async handle(socket: Socket, data: { gameId: string }): Promise<void> {
    if (!data.gameId) {
      console.error('Invalid data received:', data);
      socket.emit('error', 'Invalid data received start game');
      return;
    }
    const gameData = await this.gameService.startGame(data.gameId);
    if (!gameData) {
      socket.emit('error', 'Game not found');
      return;
    }
    socket.to(data.gameId).emit('gameStarted', gameData);
  }
}

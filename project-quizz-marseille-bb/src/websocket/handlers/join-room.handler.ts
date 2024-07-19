import { Inject, Injectable } from '@nestjs/common';
import { IGameEventsHandler } from '../interfaces/game-events.handler.interface';
import { IGameService } from '../../game/interfaces/game.service.interface';
import { IPlayerService } from '../../game/interfaces/player.service.interface';
import { Socket } from 'socket.io';

@Injectable()
export class JoinRoomHandler implements IGameEventsHandler {
  constructor(
    @Inject('IPlayerService') private readonly playerService: IPlayerService,
    @Inject('IGameService') private readonly gameService: IGameService,
  ) {}

  async handle(
    socket: Socket,
    data: { event: string; data: { gameId: string; playerId: string } },
    server: any,
  ): Promise<void> {
    const { gameId, playerId } = data.data;

    if (!gameId || !playerId) {
      console.error('Invalid data received:', data);
      socket.emit('error', 'Invalid data received join room');
      return;
    }
    const game = await this.gameService.findGameById(gameId);
    if (!game) {
      socket.emit('error', 'Room not found');
      return;
    }

    const gameWithQuiz = await this.gameService.findGameWithQuizById(gameId);

    const playersInRoom = await this.playerService.getPlayersInGame(gameId);
    if (playersInRoom.length >= gameWithQuiz.quiz.maxPlayers) {
      socket.emit('roomFull', 'The room is full.');
      return;
    }

    await this.playerService.addPlayer(gameId, playerId);

    try {
      await socket.join(gameId);
      console.log(`Socket ${socket.id} joined room ${gameId}`);
      socket.emit('roomJoined', { roomId: gameId, player: playerId });
      console.log(`Emitted roomJoined event with roomId ${gameId}`);
      server.to(gameId).emit('playerJoined', { player: playerId });
      await this.logPlayersInRoom(socket, gameId);
    } catch (err) {
      console.error(`Error joining room ${gameId}:`, err);
      socket.emit('error', 'Error joining room');
    }
  }

  private async logPlayersInRoom(
    socket: Socket,
    gameId: string,
  ): Promise<void> {
    const players = await this.playerService.getPlayersInGame(gameId);
    console.log(`Players in room WS ${gameId}:`);
    players.forEach((player) => {
      console.log(`Player WS individuel: ${player.name}`);
    });
  }
}

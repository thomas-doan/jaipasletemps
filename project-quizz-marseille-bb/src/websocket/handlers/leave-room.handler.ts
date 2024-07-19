import { Inject, Injectable } from '@nestjs/common';
import { IGameEventsHandler } from '../interfaces/game-events.handler.interface';
import { Socket } from 'socket.io';
import { IGameService } from 'src/game/interfaces/game.service.interface';

@Injectable()
export class LeaveRoomHandler implements IGameEventsHandler {
  constructor(
    @Inject('IGameService') private readonly gameService: IGameService,
  ) {}
  async handle(
    socket: Socket,
    data: { event: string; data: { playerId: string; gameId: string } },
  ): Promise<void> {
    console.log('LeaveRoomHandler received data:', data);
  }
}

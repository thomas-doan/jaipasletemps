import { Injectable } from '@nestjs/common';
import { IGameEventsHandler } from '../interfaces/game-events.handler.interface';
import { PlayerRoomHandler } from './player-room.handler';
import { Server, Socket } from 'socket.io';

@Injectable()
export class LeaveRoomHandler implements IGameEventsHandler {
  constructor(private playerRoomHandler: PlayerRoomHandler) {}
  async handle(socket: Socket, data: any, server: Server): Promise<void> {
    if (!server) {
      throw new Error('Server is not defined');
    }
    socket.leave(data.roomId);
    await this.playerRoomHandler.getPlayerRoom(server, data.roomId);
  }
}

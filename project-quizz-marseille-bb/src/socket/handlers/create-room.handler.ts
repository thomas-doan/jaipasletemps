import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { IGameEventsHandler } from '../interfaces/game-events.handler.interface';
import { PlayerRoomHandler } from './player-room.handler';

@Injectable()
export class CreateRoomHandler implements IGameEventsHandler {
  constructor(private playerRoomHandler: PlayerRoomHandler) {}
  async handle(socket: Socket, data: any, server: Server): Promise<void> {
    if (!server) {
      throw new Error('Server is not defined');
    }
    socket.join(data.roomId);
    socket.broadcast.emit('room-created', data.roomId);
    await this.playerRoomHandler.getPlayerRoom(server, data.roomId);
  }
}

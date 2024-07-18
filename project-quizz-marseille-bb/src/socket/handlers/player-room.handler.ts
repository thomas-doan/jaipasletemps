import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
export class PlayerRoomHandler {
  async getPlayerRoom(server: Server, roomId: string): Promise<any> {
    const players = server.sockets.adapter.rooms.get(roomId);
    if (players) {
      server.to(roomId).emit('players', Array.from(players));
    } else {
      server.to(roomId).emit('players', []);
    }
  }
}

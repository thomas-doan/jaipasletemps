import { Server } from 'socket.io';

export class GameUtilsService {
  async getActiveRooms(server: Server): Promise<string[]> {
    const rooms = server.sockets.adapter.rooms;
    const activeRooms = [];

    for (const [roomId, room] of rooms.entries()) {
      if (
        room.size > 1 ||
        (room.size === 1 && !server.sockets.sockets.has(roomId))
      ) {
        activeRooms.push(roomId);
      }
    }

    return activeRooms;
  }
}

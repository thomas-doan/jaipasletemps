import { Injectable } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@Injectable()
@WebSocketGateway({ cors: { origin: '*' } })
export class SocketService {
  @WebSocketServer()
  private io: Server;

  private isInitialized = false;

  initializeSocket() {
    if (!this.isInitialized) {
      this.io.on('connection', (socket: Socket) => {
        console.log('a user connected', socket.id);

        socket.on('disconnect', () => {
          console.log('a user disconnected');
        });
      });
      this.isInitialized = true;
    }
  }

  getIo(): Server {
    return this.io;
  }
}
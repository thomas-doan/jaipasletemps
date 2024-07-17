import { Injectable, OnModuleInit } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@Injectable()
@WebSocketGateway({ cors: { origin: '*' } })
export class SocketService implements OnModuleInit {
  @WebSocketServer()
  private io: Server;

  onModuleInit() {
    this.io.on('connection', (socket: Socket) => {
      console.log('a user connected', socket.id);

      socket.on('disconnect', () => {
        console.log('a user disconnected');
      });
    });
  }
  getIo(): Server {
    return this.io;
  }
}

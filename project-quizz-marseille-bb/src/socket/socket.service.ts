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
      console.log('a user connected');
      // Handle socket events here

      socket.on('disconnect', () => {
        console.log('a user disconnected');
      });
    });
  }
}

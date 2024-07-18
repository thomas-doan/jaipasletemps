import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { ConnectionHandler } from './handlers/connection.handler';

@Injectable()
export class SocketService {
  private handlers: Map<string, any>;

  constructor(private readonly connectionHandler: ConnectionHandler) {
    this.handlers = new Map<string, any>([
      ['connection', connectionHandler],
    ]) 
  }

  public bindHandler(server: Server): void {
    server.on('connection', (socket: Socket) => {
      console.log(`Client connected: ${socket.id}`);
      this.handleEvent(socket, 'connection');
    });
  }

  private async handleEvent(
    socket: Socket,
    event: string,
    data?: any,
  ): Promise<void> {
    const handler = this.handlers.get(event);
    if (handler) {
      await handler.handle(socket, data);
    }
  }
}

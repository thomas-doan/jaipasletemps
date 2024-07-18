import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { ConnectionHandler } from './handlers/connection.handler';
import { DeconnectionHandler } from './handlers/deconnection.handler';
import { CreateRoomHandler } from './handlers/create-room.handler';
import { JoinRoomHandler } from './handlers/join-room.handler';
import { LeaveRoomHandler } from './handlers/leave-room.handler';

@Injectable()
export class SocketService {
  private handlers: Map<string, any>;

  constructor(
    private readonly connectionHandler: ConnectionHandler,
    private readonly disconnectionHandler: DeconnectionHandler,
    private readonly createRoomHandler: CreateRoomHandler,
    private readonly joinRoomHandler: JoinRoomHandler,
    private readonly leaveRoomHandler: LeaveRoomHandler,
  ) {
    this.handlers = new Map<string, any>([
      ['connection', connectionHandler],
      ['disconnection', disconnectionHandler],
      ['create-room', createRoomHandler],
      ['join-room', JoinRoomHandler],
      ['leave-room', leaveRoomHandler],
    ]);
  }

  public bindHandler(server: Server): void {
    server.on('connection', (socket: Socket) => {
      this.handleEvent(socket, 'connection');
    });
    server.on('create-room', (socket: Socket, data: any) => {
      this.handleEvent(socket, 'create-room', data, server);
    });
    server.on('join-room', (socket: Socket, data: any) => {
      this.handleEvent(socket, 'join-room', data, server);
    });
    server.on('leave-room', (socket: Socket, data: any) => {
      this.handleEvent(socket, 'leave-room', data, server);
    });
    server.on('disconnection', (socket: Socket) => {
      this.handleEvent(socket, 'disconnection');
    });
  }

  private async handleEvent(
    socket: Socket,
    event: string,
    data?: any,
    server?: Server,
  ): Promise<void> {
    const handler = this.handlers.get(event);
    if (handler) {
      await handler.handle(socket, data, server);
    }
  }
}


import { IGameEventsHandler } from '../interfaces/game-events.handler.interface';
import { Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeconnectionHandler implements IGameEventsHandler {
  async handle(socket: Socket): Promise<void> {
    console.log(`Client disconnected: ${socket.id}`);
  }
}

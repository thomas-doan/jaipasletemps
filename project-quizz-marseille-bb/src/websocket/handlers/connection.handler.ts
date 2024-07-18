import { Injectable } from '@nestjs/common';
import { IGameEventsHandler } from '../interfaces/game-events.handler.interface';
import { Socket } from 'socket.io';

@Injectable()
export class ConnectionHandler implements IGameEventsHandler {
    async handle(socket: Socket): Promise<void> {
        console.log(`Client connected: ${socket.id}`);
    }
}

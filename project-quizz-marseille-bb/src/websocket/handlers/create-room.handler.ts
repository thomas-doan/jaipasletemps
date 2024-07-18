// websocket/handlers/create-room.handler.ts
import { Injectable, Inject } from '@nestjs/common';
import { IGameEventsHandler } from '../interfaces/game-events.handler.interface';
import { IGameService } from '../../game/interfaces/game.service.interface';
import { Socket } from 'socket.io';

@Injectable()
export class CreateRoomHandler implements IGameEventsHandler {
    constructor(
        @Inject('IGameService') private readonly gameService: IGameService,
    ) {}

    async handle(socket: Socket, data: { quizId: string; playerName: string; userId: string }): Promise<void> {
     /*   const game = await this.gameService.create(data.quizId, data.playerName, data.userId);
        socket.join(game.id);
        socket.emit('roomCreated', { roomId: game.id });*/
    }
}

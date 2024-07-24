import {forwardRef, Inject, Injectable} from '@nestjs/common';
import { IGameEventsHandler } from '../interfaces/game-events.handler.interface';
import { IGameService } from '../../game/interfaces/game.service.interface';
import { Socket } from 'socket.io';
import {WebsocketService} from "../services/websocket.service";

@Injectable()
export class StartGameHandler implements IGameEventsHandler {
    constructor(
        @Inject(forwardRef(() => WebsocketService))
        private readonly websocketService: WebsocketService,
        @Inject('IGameService') private readonly gameService: IGameService) {}

    async handle(socket: Socket, data: { event: string; data: { gameId: string } }): Promise<void> {
        const { gameId } = data.data;
        await this.gameService.startGame(gameId);
        const server = this.websocketService.getServer();
        server.to(gameId).emit('gameStarted', { message: 'Game has started',  });
    }
}

import {Inject, Injectable} from '@nestjs/common';
import { IGameEventsHandler } from '../interfaces/game-events.handler.interface';
import { IGameService } from '../../game/interfaces/game.service.interface';
import { Socket } from 'socket.io';

@Injectable()
export class StartGameHandler implements IGameEventsHandler {
    constructor(
        @Inject('IGameService') private readonly gameService: IGameService) {}

    async handle(socket: Socket, data: { event: string; data: { gameId: string } }): Promise<void> {
        const { gameId } = data.data;
        await this.gameService.startGame(gameId);
        socket.to(gameId).emit('gameStarted', { message: 'Game has started' });
    }
}
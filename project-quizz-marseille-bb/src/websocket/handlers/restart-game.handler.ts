import {Inject, Injectable} from '@nestjs/common';
import { IGameEventsHandler } from '../interfaces/game-events.handler.interface';
import { IGameService } from '../../game/interfaces/game.service.interface';
import { Socket } from 'socket.io';

@Injectable()
export class RestartGameHandler implements IGameEventsHandler {
    constructor(
        @Inject('IGameService')
        private readonly gameService: IGameService) {}

    async handle(socket: Socket, data: { gameId: string }): Promise<void> {
        const { gameId } = data;

        if (!gameId) {
            throw new Error('Game id is required');
        }
        await this.gameService.restartGame(gameId);
    }
}

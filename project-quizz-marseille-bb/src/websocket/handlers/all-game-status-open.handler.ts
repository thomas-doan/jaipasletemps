import {Inject, Injectable} from '@nestjs/common';
import { IGameEventsHandler } from '../interfaces/game-events.handler.interface';
import { IGameService } from '../../game/interfaces/game.service.interface';
import { Socket } from 'socket.io';

@Injectable()
export class AllGameStatusOpenHandler implements IGameEventsHandler {
    private intervalId: NodeJS.Timeout;
    private previousGames: string;
    constructor(
        @Inject('IGameService')
        private readonly gameService: IGameService
    ) {}

    async handle(socket: Socket, data: { event: string; data: {} }): Promise<void> {
        this.previousGames = '';

        this.intervalId = setInterval(async () => {
            const getAllGamesWithStatusOpen = await this.gameService.getAllGamesWithStatusOpen();
            const currentGames = JSON.stringify(getAllGamesWithStatusOpen);

            if (currentGames !== this.previousGames) {
                this.previousGames = currentGames;
                console.log('allGameStatusOpen', currentGames);
                socket.emit('allGameStatusOpen', { message: currentGames });
                socket.broadcast.emit('allGameStatusOpen', { message: currentGames });
            }
        }, 1000);
    }

}
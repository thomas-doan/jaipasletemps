import {Inject, Injectable} from '@nestjs/common';
import { IGameEventsHandler } from '../interfaces/game-events.handler.interface';
import { IGameService } from '../../game/interfaces/game.service.interface';
import { Socket } from 'socket.io';

@Injectable()
export class AllGameStatusOpenHandler implements IGameEventsHandler {
    private intervalId: NodeJS.Timeout;
    constructor(
        @Inject('IGameService')
        private readonly gameService: IGameService) {}

    async handle(socket: Socket, data:{event: string; data: {}}): Promise<void> {
        //await this.gameService.closeChoice();
        let counter = 0;
        const getAllGamesWithStatusOpen = this.gameService.getAllGamesWithStatusOpen();
        this.intervalId = setInterval(() => {
            counter++;
            socket.emit('allGameStatusOpen', { message: `Event number: ${getAllGamesWithStatusOpen}` });
        }, 1000);
    }

}

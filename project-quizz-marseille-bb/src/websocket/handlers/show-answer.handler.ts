import {Inject, Injectable} from '@nestjs/common';
import { IGameEventsHandler } from '../interfaces/game-events.handler.interface';
import { IGameService } from '../../game/interfaces/game.service.interface';
import { Socket } from 'socket.io';

@Injectable()
export class ShowAnswerHandler implements IGameEventsHandler {
    constructor(
        @Inject('IGameService')
        private readonly gameService: IGameService) {}

    async handle(socket: Socket, data: { gameId: string }): Promise<void> {
        //const answer = await this.gameService.showAnswer();
        //socket.emit('answer', answer);
    }
}

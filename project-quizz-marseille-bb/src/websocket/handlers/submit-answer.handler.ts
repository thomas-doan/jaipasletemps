import {Inject, Injectable} from '@nestjs/common';
import { IGameEventsHandler } from '../interfaces/game-events.handler.interface';
import { IGameService } from '../../game/interfaces/game.service.interface';
import { Socket } from 'socket.io';

@Injectable()
export class SubmitAnswerHandler implements IGameEventsHandler {
    constructor(
        @Inject('IGameService')
        private readonly gameService: IGameService) {}

    async handle(socket: Socket, data: { gameId: string; playerId: string; answers: string[] }): Promise<void> {
       // const results = await this.gameService.answerQuestion();
       // socket.emit('answerResult', results);
    }
}

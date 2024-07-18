import {Inject, Injectable} from '@nestjs/common';
import { IGameEventsHandler } from '../interfaces/game-events.handler.interface';
import { IGameService } from '../../game/interfaces/game.service.interface';
import { Socket } from 'socket.io';

@Injectable()
export class ShowQuestionHandler implements IGameEventsHandler {
    constructor(
        @Inject('IGameService')
        private readonly gameService: IGameService) {}

    async handle(socket: Socket, data: { gameId: string }): Promise<void> {
      // const question = await this.gameService.showQuestion();
       // socket.emit('question', question);
    }
}

import { Inject, Injectable} from '@nestjs/common';
import { IGameEventsHandler } from '../interfaces/game-events.handler.interface';
import { IGameService } from '../../game/interfaces/game.service.interface';
import { Socket } from 'socket.io';

@Injectable()
export class ShowNextQuestionHandler implements IGameEventsHandler {
    constructor(
        @Inject('IGameService')
        private readonly gameService: IGameService,
        ) {}

    async handle(socket: Socket, data:{event: string; data: {gameId}}): Promise<void> {
      const question = await this.gameService.showNextQuestion(
            data.data.gameId
      );
        socket.broadcast.to(data.data.gameId).emit('question', question);
        socket.emit('question', question)
        console.log('Question envoyée');
       // socket.to(data.data.gameId).emit('question', question);
    }
}

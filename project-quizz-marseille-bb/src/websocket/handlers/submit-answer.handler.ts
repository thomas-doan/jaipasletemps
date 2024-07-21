import {forwardRef, Inject, Injectable} from '@nestjs/common';
import { IGameEventsHandler } from '../interfaces/game-events.handler.interface';
import { IGameService } from '../../game/interfaces/game.service.interface';
import { Socket } from 'socket.io';
import {GameService} from "../../game/services/game.service";

@Injectable()
export class SubmitAnswerHandler implements IGameEventsHandler {
    constructor(
        @Inject(forwardRef(() => 'IGameService'))
        private readonly gameService: GameService,
    ) {}

    async handle(socket: Socket, data: { event: string; data: { gameId: string; playerId: string; answers: string[] } }): Promise<void> {
        const { gameId, playerId, answers } = data.data;

        // Vérifiez si une réponse correcte a déjà été enregistrée pour cette question
        if (!this.gameService.firstCorrectAnswer[gameId]) {
            console.log('Checking answer'+playerId);
            const isCorrect = await this.gameService.answerQuestion(gameId, playerId, answers);

            if (isCorrect) {
                // Enregistrez la première réponse correcte pour ce jeu
                this.gameService.firstCorrectAnswer[gameId] = playerId;
                console.log('Rep valide par playerId : ' + playerId);

                socket.emit('answerResult', { correct: true, playerId });
                socket.to(gameId).emit('playerScored', { playerId });
            } else {
                socket.emit('answerResult', { correct: false });
            }
        } else {
            console.log('Question already answered correctly'+playerId);
            socket.emit('answerResult', { correct: false, message: 'Question already answered correctly' });
        }
    }}

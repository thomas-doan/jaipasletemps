import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { ConnectionHandler } from '../handlers/connection.handler';
import { DisconnectionHandler } from '../handlers/disconnection.handler';
import { CreateRoomHandler } from '../handlers/create-room.handler';
import { JoinRoomHandler } from '../handlers/join-room.handler';
import { StartGameHandler } from '../handlers/start-game.handler';
import { ShowQuestionHandler } from '../handlers/show-question.handler';
import { SubmitAnswerHandler } from '../handlers/submit-answer.handler';
import { EndGameHandler } from '../handlers/end-game.handler';
import { RestartGameHandler } from '../handlers/restart-game.handler';
import { ShowAnswerHandler } from '../handlers/show-answer.handler';
import { CloseChoiceHandler } from '../handlers/close-choice.handler';

@Injectable()
export class WebsocketService {
    private handlers: Map<string, any>;

    constructor(
        private readonly connectionHandler: ConnectionHandler,
        private readonly disconnectionHandler: DisconnectionHandler,
        private readonly createRoomHandler: CreateRoomHandler,
        private readonly joinRoomHandler: JoinRoomHandler,
        private readonly startGameHandler: StartGameHandler,
        private readonly showQuestionHandler: ShowQuestionHandler,
        private readonly submitAnswerHandler: SubmitAnswerHandler,
        private readonly endGameHandler: EndGameHandler,
        private readonly restartGameHandler: RestartGameHandler,
        private readonly showAnswerHandler: ShowAnswerHandler,
        private readonly closeChoiceHandler: CloseChoiceHandler,
    ) {
        this.handlers = new Map<string, any>([
            ['connection', this.connectionHandler],
            ['disconnect', this.disconnectionHandler],
            ['createRoom', this.createRoomHandler],
            ['joinRoom', this.joinRoomHandler],
            ['startGame', this.startGameHandler],
            ['showQuestion', this.showQuestionHandler],
            ['submitAnswer', this.submitAnswerHandler],
            ['endGame', this.endGameHandler],
            ['restartGame', this.restartGameHandler],
            ['showAnswer', this.showAnswerHandler],
            ['closeChoice', this.closeChoiceHandler],
        ]);
    }

    public bindHandlers(server: Server): void {
        server.on('connection', (socket: Socket) => {
            this.handleEvent(socket, 'connection');
            socket.on('disconnect', () => this.handleEvent(socket, 'disconnect'));
            socket.on('createRoom', (data) => this.handleEvent(socket, 'createRoom', data));
            socket.on('joinRoom', (data) => this.handleEvent(socket, 'joinRoom', data));
            socket.on('startGame', (data) => this.handleEvent(socket, 'startGame', data));
            socket.on('showQuestion', (data) => this.handleEvent(socket, 'showQuestion', data));
            socket.on('submitAnswer', (data) => this.handleEvent(socket, 'submitAnswer', data));
            socket.on('endGame', (data) => this.handleEvent(socket, 'endGame', data));
            socket.on('restartGame', (data) => this.handleEvent(socket, 'restartGame', data));
            socket.on('showAnswer', (data) => this.handleEvent(socket, 'showAnswer', data));
            socket.on('closeChoice', (data) => this.handleEvent(socket, 'closeChoice', data));
        });
    }

    private async handleEvent(socket: Socket, event: string, data?: any): Promise<void> {
        const handler = this.handlers.get(event);
        if (handler) {
            await handler.handle(socket, data);
        }
    }
}

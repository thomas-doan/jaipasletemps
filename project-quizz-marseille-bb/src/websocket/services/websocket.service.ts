import { Injectable, OnModuleInit } from '@nestjs/common';
import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import { ConnectionHandler } from '../handlers/connection.handler';
import { DisconnectionHandler } from '../handlers/disconnection.handler';
import { CreateRoomHandler } from '../handlers/create-room.handler';
import { JoinRoomHandler } from '../handlers/join-room.handler';
import { StartGameHandler } from '../handlers/start-game.handler';
import { ShowNextQuestionHandler } from '../handlers/show-next-question.handler';
import { SubmitAnswerHandler } from '../handlers/submit-answer.handler';
import { EndGameHandler } from '../handlers/end-game.handler';
import { RestartGameHandler } from '../handlers/restart-game.handler';
import { CloseChoiceHandler } from '../handlers/close-choice.handler';
import {AllGameStatusOpenHandler} from "../handlers/all-game-status-open.handler";

@Injectable()
export class WebsocketService implements OnModuleInit {
    private server: Server;
    private handlers: Map<string, any>;

    constructor(
        private readonly connectionHandler: ConnectionHandler,
        private readonly disconnectionHandler: DisconnectionHandler,
        private readonly createRoomHandler: CreateRoomHandler,
        private readonly allGameStatusOpenHandler: AllGameStatusOpenHandler,
        private readonly joinRoomHandler: JoinRoomHandler,
        private readonly startGameHandler: StartGameHandler,
        private readonly showNextQuestionHandler: ShowNextQuestionHandler,
        private readonly submitAnswerHandler: SubmitAnswerHandler,
        private readonly endGameHandler: EndGameHandler,
        private readonly restartGameHandler: RestartGameHandler,
        private readonly closeChoiceHandler: CloseChoiceHandler,
    ) {
        this.handlers = new Map<string, any>([
            ['connection', this.connectionHandler],
            ['disconnect', this.disconnectionHandler],
            ['createRoom', this.createRoomHandler],
            ['allGameStatusOpen', this.allGameStatusOpenHandler],
            ['joinRoom', this.joinRoomHandler],
            ['startGame', this.startGameHandler],
            ['showNextQuestion', this.showNextQuestionHandler],
            ['submitAnswer', this.submitAnswerHandler],
            ['endGame', this.endGameHandler],
            ['restartGame', this.restartGameHandler],
            ['closeChoice', this.closeChoiceHandler],
        ]);
    }

    setServer(server: Server) {
        this.server = server;
    }
    
    getServer(): Server {
        if (!this.server) {
            throw new Error('WebSocket server not initialized');
        }
        return this.server;
    }

    onModuleInit() {
        console.log('WebsocketService initialized');
    }

    public bindHandlers(server: Server): void {
        server.on('connection', (socket: Socket) => {
            this.handleEvent(socket, 'connection');
            socket.on('disconnect', () => this.handleEvent(socket, 'disconnect'));
        });
    }

    public async handleEvent(socket: Socket, event: string, data?: any): Promise<void> {
        const handler = this.handlers.get(event);
        if (handler) {
            await handler.handle(socket, data);
        }
    }
}

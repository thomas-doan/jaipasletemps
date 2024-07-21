import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { WebsocketService } from '../services/websocket.service';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class GameGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
    private logger: Logger = new Logger('GameGateway');

    constructor(private readonly websocketService: WebsocketService) {}

    afterInit(server: Server) {
        this.websocketService.setServer(server);
        this.websocketService.bindHandlers(server);
        this.logger.log('WebSocket server initialized');
    }

    handleConnection(client: Socket) {
        this.logger.log(`Client connected: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    @SubscribeMessage('createRoom')
    handleCreateRoom(client: Socket, payload: any): void {
        this.websocketService.handleEvent(client, 'createRoom', payload);
    }

    @SubscribeMessage('joinRoom')
    handleJoinRoom(client: Socket, payload: any): void {
        this.websocketService.handleEvent(client, 'joinRoom', payload);
    }

    @SubscribeMessage('startGame')
    handleStartGame(client: Socket, payload: any): void {
        this.websocketService.handleEvent(client, 'startGame', payload);
    }

    @SubscribeMessage('showQuestion')
    handleShowQuestion(client: Socket, payload: any): void {
        this.websocketService.handleEvent(client, 'showQuestion', payload);
    }

    @SubscribeMessage('submitAnswer')
    handleSubmitAnswer(client: Socket, payload: any): void {
        this.websocketService.handleEvent(client, 'submitAnswer', payload);
    }

    @SubscribeMessage('endGame')
    handleEndGame(client: Socket, payload: any): void {
        this.websocketService.handleEvent(client, 'endGame', payload);
    }

    @SubscribeMessage('restartGame')
    handleRestartGame(client: Socket, payload: any): void {
        this.websocketService.handleEvent(client, 'restartGame', payload);
    }

    @SubscribeMessage('showAnswer')
    handleShowAnswer(client: Socket, payload: any): void {
        this.websocketService.handleEvent(client, 'showAnswer', payload);
    }

    @SubscribeMessage('closeChoice')
    handleCloseChoice(client: Socket, payload: any): void {
        this.websocketService.handleEvent(client, 'closeChoice', payload);
    }
}

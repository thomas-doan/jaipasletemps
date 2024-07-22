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
import {WebSocketEvents} from "../enum/websocket-events.enum";

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

    @SubscribeMessage(WebSocketEvents.CREATE_ROOM)
    handleCreateRoom(client: Socket, payload: any): void {
        this.websocketService.handleEvent(client, WebSocketEvents.CREATE_ROOM, payload);
       // socket.join(data.data.quizId);
    }

    @SubscribeMessage(WebSocketEvents.JOIN_ROOM)
    handleJoinRoom(client: Socket, payload: any): void {
       this.websocketService.handleEvent(client, WebSocketEvents.JOIN_ROOM, payload);

      /*  socket.join(data.data.gameId);
        const clients = this.server.sockets.adapter.rooms.get(data.data.gameId);
        const socketIds = clients ? Array.from(clients) : [];

        console.log(`Socket IDs in room ${data.data.gameId}:`, socketIds);*/
    }

    @SubscribeMessage(WebSocketEvents.START_GAME)
    handleStartGame(client: Socket, payload: any): void {
        this.websocketService.handleEvent(client, WebSocketEvents.START_GAME, payload);
    }

    @SubscribeMessage(WebSocketEvents.SHOW_NEXT_QUESTION)
    handleShowQuestion(client: Socket, payload: any): void {
        this.websocketService.handleEvent(client, WebSocketEvents.SHOW_NEXT_QUESTION, payload);
    }

    @SubscribeMessage(WebSocketEvents.SUBMIT_ANSWER)
    handleSubmitAnswer(client: Socket, payload: any): void {
        this.websocketService.handleEvent(client, WebSocketEvents.SUBMIT_ANSWER, payload);
    }

    @SubscribeMessage(WebSocketEvents.END_GAME)
    handleEndGame(client: Socket, payload: any): void {
        this.websocketService.handleEvent(client, WebSocketEvents.END_GAME, payload);
    }

    @SubscribeMessage(WebSocketEvents.RESTART_GAME)
    handleRestartGame(client: Socket, payload: any): void {
        this.websocketService.handleEvent(client, WebSocketEvents.RESTART_GAME, payload);
    }

    @SubscribeMessage(WebSocketEvents.SHOW_ANSWER)
    handleShowAnswer(client: Socket, payload: any): void {
        this.websocketService.handleEvent(client, WebSocketEvents.SHOW_ANSWER, payload);
    }

    @SubscribeMessage(WebSocketEvents.CLOSE_CHOICE)
    handleCloseChoice(client: Socket, payload: any): void {
        this.websocketService.handleEvent(client, WebSocketEvents.CLOSE_CHOICE, payload);
    }
}
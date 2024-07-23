import {forwardRef, Inject, Injectable} from '@nestjs/common';
import { IGameEventsHandler } from '../interfaces/game-events.handler.interface';
import { Socket } from 'socket.io';
import {IGameService} from "../../game/interfaces/game.service.interface";
import {WebsocketService} from "../services/websocket.service";

@Injectable()
export class ConnectionHandler implements IGameEventsHandler {
    constructor(
        @Inject(forwardRef(() => WebsocketService))
        private readonly websocketService: WebsocketService,
        @Inject('IGameService') private readonly gameService: IGameService,
    ) {}
    async handle(socket: Socket): Promise<void> {
        console.log(`Client connected: ${socket.id}`);

        const activeRooms = await this.gameService.getActiveRooms();
        const server = this.websocketService.getServer();
        server.emit('activeRooms', activeRooms);
    }
}

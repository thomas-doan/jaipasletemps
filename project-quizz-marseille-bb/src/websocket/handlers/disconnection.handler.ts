// websocket/handlers/disconnection.handler.ts
import { Injectable, Inject } from '@nestjs/common';
import { IGameEventsHandler } from '../interfaces/game-events.handler.interface';
import { Socket } from 'socket.io';
import {IPlayerService} from "../../game/interfaces/player.service.interface";

@Injectable()
export class DisconnectionHandler implements IGameEventsHandler {
    constructor(
        @Inject('IPlayerService') private readonly playerService: IPlayerService,
    ) {}

    async handle(socket: Socket): Promise<void> {
        console.log(`Client disconnected: ${socket.id}`);
        await this.playerService.handleDisconnection(socket.id);
    }
}

import {Inject, Injectable} from '@nestjs/common';
import { IGameEventsHandler } from '../interfaces/game-events.handler.interface';
import { IGameService } from '../../game/interfaces/game.service.interface';
import { IPlayerService } from '../../game/interfaces/player.service.interface';
import { Socket } from 'socket.io';

@Injectable()
export class JoinRoomHandler implements IGameEventsHandler {
    constructor(
        @Inject('IPlayerService') private readonly playerService: IPlayerService,
        @Inject('IGameService') private readonly gameService: IGameService,
    ) {}

    async handle(socket: Socket, data: { room: string; playerName: string; userId: string }): Promise<void> {
/*        const game = await this.gameService.findGameById();
        if (!game) {
            socket.emit('error', 'Room not found');
            return;
        }

        const playersInRoom = await this.playerService.getPlayersInGame();
        if (playersInRoom.length >= game.maxPlayers) {
            socket.emit('roomFull', 'The room is full.');
            return;
        }

        await this.playerService.addPlayer();
        socket.join(data.room);
        socket.emit('roomJoined', { roomId: data.room });
        */
    }
}

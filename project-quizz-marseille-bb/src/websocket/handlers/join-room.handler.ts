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


        async handle(socket: Socket, data:{event: string; data: {gameId: string; playerName: string; userId: string }}): Promise<void> {
        const { gameId, playerName, userId } = data.data;

        if (!gameId || !playerName || !userId) {
            console.error('Invalid data received:', data);
            socket.to(gameId).emit('error', 'Invalid data received join room');
            return;
        }
        const game = await this.gameService.findGameById(gameId);
        if (!game) {
            socket.to(gameId).emit('error', 'Room not found');
            return;
        }

        const gameWithQuiz = await this.gameService.findGameWithQuizById(game.id);

        console.log('gamewithquiz', gameWithQuiz);

        const playersInRoom = await this.playerService.getPlayersInGame(game.id);
        if (playersInRoom.length >= gameWithQuiz.quiz.maxPlayers) {
            socket.to(gameId).emit('roomFull', 'The room is full.');
            return;
        }

        await this.playerService.addPlayer(gameId, playerName, userId);

        try {
            await socket.join(gameId);
            console.log(`Socket ${socket.id} joined room ${gameId}`);
            socket.to(gameId).emit('roomJoined', { roomId: gameId });
            console.log(`Emitted roomJoined event with roomId ${gameId}`);
           await this.logPlayersInRoom(socket, gameId);
        }
        catch (err) {
            console.error(`Error joining room ${gameId}:`, err);
            socket.to(gameId).emit('error', 'Error joining room');
        }
        
    }

    private async logPlayersInRoom(socket: Socket, gameId: string): Promise<void> {
        const players = await this.playerService.getPlayersInGame(gameId);
        console.log(`Players in room WS ${gameId}:`);
        players.forEach(player => {
            console.log(`Player WS individuel: ${player.name}`);
        });
    }

}

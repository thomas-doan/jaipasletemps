import { Player } from '@prisma/client';

export interface IPlayerService {
    addPlayer(gameId: string, playerName: string, playerId: string): Promise<Player>;
    getPlayersInGame(gameId: string): Promise<Player[]>;
    handleDisconnection(playerId: string): Promise<void>;
    handleReconnection(playerId: string): Promise<void>;
}
import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { IPlayerService } from '../interfaces/player.service.interface';
import { Player } from '@prisma/client';

@Injectable()
export class PlayerService implements IPlayerService {
    constructor(private database: DatabaseService) {}

    async addPlayer(gameId: string, playerName: string, userId: string): Promise<Player> {

        return {} as Player;
    }

    async getPlayersInGame(gameId: string): Promise<Player[]> {
        return [];
    }

    async handleDisconnection(playerId: string): Promise<void> {
    }

    async handleReconnection(playerId: string): Promise<void> {
    }
    
}

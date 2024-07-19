import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { IPlayerService } from '../interfaces/player.service.interface';
import { Player } from '@prisma/client';

@Injectable()
export class PlayerService implements IPlayerService {
    constructor(private database: DatabaseService) {}

    async addPlayer(gameId: string, playerName: string, userId: string): Promise<Player> {

        const getUser = await this.database.user.findUnique({
            where: { id: userId },
        });
        
        const getPlayer = await this.database.player.findFirst({
            where: { userId: getUser.id },
        });

        const findPlayerInPlayerActivites = await this.database.playerActivites.findFirst({
            where: { playerId: getPlayer.id },
        });

        if (!findPlayerInPlayerActivites) {
            await this.database.playerActivites.create({
                data: {
                    gameId,
                    playerId: getPlayer.id,
                },
            });
        }
        return getPlayer;
    }

    async getPlayersInGame(gameId: string): Promise<Player[]> {
        const activities = await this.database.playerActivites.findMany({
            where: { gameId },
            include: { player: true },
        });

        return activities.map(activity => activity.player);
    }

    async handleDisconnection(playerId: string): Promise<void> {
    }

    async handleReconnection(playerId: string): Promise<void> {
    }
    
}
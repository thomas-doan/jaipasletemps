import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { IScoreService } from '../interfaces/score.service.interface';

@Injectable()
export class ScoreService implements IScoreService {
    constructor(private database: DatabaseService) {}

    async updateScore(gameId: string, playerId: string): Promise<void> {
    }
}

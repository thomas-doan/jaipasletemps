import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { IScoreService } from '../interfaces/score.service.interface';
import {Score} from "../model/score.model";

@Injectable()
export class ScoreService implements IScoreService {
    constructor(private database: DatabaseService) {}

    async updateScore(gameId: string, playerId: string): Promise<void> {
        const scoreInstance = Score.getInstance();
        scoreInstance.updateScore(playerId);

        await this.database.game.update({
            where: { id: gameId },
            data: {
                score: scoreInstance.getScoreJsonFormated(),
            },
        });
    }
}

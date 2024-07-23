import {Injectable} from '@nestjs/common';
import {DatabaseService} from '../../database/database.service';
import {IScoreService} from '../interfaces/score.service.interface';
import {Score} from '../model/score.model';
import {EloRule} from '../../business_rule/enum/score.enum';

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
    async insertScoreAndHistoryOfgame(gameId: string): Promise<void> {
        const gameFinished = await this.database.game.findUnique({ where: { id: gameId } });
        if (!gameFinished) throw new Error('Game not found');

        const playersActivities = await this.database.playerActivites.findMany({
            where: { gameId: gameFinished.id },
            include: { player: true },
        });

        const winnerId = Score.getInstance().determineWinnerIdPlayer();
        const historyGame = await this.createHistoryGame(gameFinished, winnerId);
        await this.updateWinnerElo(winnerId);

        for (const activity of playersActivities) {
            await this.upsertPlayerHistory(activity.player, historyGame.id, winnerId);
        }
    }

    private async createHistoryGame(gameFinished: any, winnerId: string | null) {
        const scoreInstance = Score.getInstance();
        const winner = winnerId ? await this.database.player.findUnique({ where: { id: winnerId } }) : null;
        return this.database.historyGame.create({
            data: {
                score: scoreInstance.getScoreJsonFormated(),
                joker_used: {},
                total_question: gameFinished.total_question,
                quizId: gameFinished.quizId,
                winner: winner ? winner.name : 'No winner',
            },
        });
    }

    private async updateWinnerElo(winnerId: string | null) {
        if (winnerId) {
            await this.database.player.update({
                where: { id: winnerId },
                data: { elo: { increment: EloRule.GAME_WIN } },
            });
        }
    }

    private async upsertPlayerHistory(player: any, historyGameId: string, winnerId: string | null) {
        const existingHistory = await this.database.playerHistories.findFirst({
            where: {
                playerId: player.id,
                historyGameId: historyGameId,
            },
        });

        const isWinner = player.id === winnerId;
        const eloIncrement = isWinner ? EloRule.GAME_WIN : EloRule.AUCUN_GAGNANT;

        if (existingHistory) {
            await this.database.playerHistories.update({
                where: {
                    playerId_historyGameId: {
                        playerId: player.id,
                        historyGameId: historyGameId,
                    },
                },
                data: {
                    name: player.name,
                    elo: { increment: eloIncrement },
                },
            });
        } else {
            await this.database.playerHistories.create({
                data: {
                    name: player.name,
                    elo: player.elo + eloIncrement,
                    playerId: player.id,
                    historyGameId: historyGameId,
                },
            });
        }
    }
}

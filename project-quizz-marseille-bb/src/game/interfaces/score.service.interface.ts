export interface IScoreService {
    updateScore(gameId: string, playerId: string): Promise<void>;
    insertScoreAndHistoryOfgame(gameId: string): Promise<void>;
}

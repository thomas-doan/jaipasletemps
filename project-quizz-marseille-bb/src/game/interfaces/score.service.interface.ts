export interface IScoreService {
  updateScore(gameId: string, playerId: string): Promise<void>;
  getScoreGame(gameId: string): Promise<any>;
}

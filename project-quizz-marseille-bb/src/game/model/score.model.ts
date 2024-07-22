import { ScoreInitiation, ScoreRule } from "../../business_rule/enum/score.enum";

export class Score {
    private static instance: Score;
    private playersInGame: { playerId: string }[];
    private score: Map<string, number>;

    constructor(players: { playerId: string }[]) {
        this.playersInGame = players;
        this.score = new Map();
        this.mapInitiationStartGamePlayersWithScore(this.playersInGame);
    }

    public static getInstance(players?: { playerId: string }[]): Score {
        if (!Score.instance) {
            Score.instance = new Score(players);
        }
        return Score.instance;
    }

    private mapInitiationStartGamePlayersWithScore(players: { playerId: string }[]) {
        players.forEach(player => {
            this.score.set(player.playerId, ScoreInitiation.SCORE_INITIATION_START_GAME);
        });
    }

    public updateScore(playerId: string) {
        let currentScore = this.score.get(playerId);
        this.score.set(playerId, (currentScore + ScoreRule.UPDATE_SCORE));
    }

    public getScoreJsonFormated(): string {
        const scoreFormated = Object.fromEntries(this.score);
        return JSON.stringify(scoreFormated);
    }
}
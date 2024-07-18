import { Game } from '@prisma/client';

export interface IGameService {
    createGame(data: Game): Promise<Game>;
}
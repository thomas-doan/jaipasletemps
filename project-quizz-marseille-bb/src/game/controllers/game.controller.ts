import {Controller, Inject, Param, Post} from '@nestjs/common';
import { GameService } from '../services/game.service';
import {IGameService} from "../interfaces/game.service.interface";

@Controller('game')
export class GameController {
  constructor(
  @Inject('IGameService') private readonly gameService: IGameService
) {}

  @Post(':gameId/start')
  async startGame(@Param('gameId') gameId: string) {
    return this.gameService.startGame(gameId);
  }
}

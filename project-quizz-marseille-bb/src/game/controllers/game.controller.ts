import {Controller, Get, Inject, Param, Post} from '@nestjs/common';
import { GameService } from '../services/game.service';
import {IGameService} from "../interfaces/game.service.interface";
import { Cron, CronExpression } from '@nestjs/schedule';


@Controller('game')
export class GameController {
  constructor(
  @Inject('IGameService') private readonly gameService: IGameService
) {}

  @Post(':gameId/start')
  async startGame(@Param('gameId') gameId: string) {
    return this.gameService.startGame(gameId);
  }


  @Get('/all')
  @Cron('*/3 * * * * *')
  async getAllGames() {
   return this.gameService.getAllGamesWithStatusOpen();
  }
}

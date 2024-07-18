import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import {GamesModule} from "../games/games.module";
import {ConnectionHandler} from "./handlers/connection.handler";
import { GameGateway } from './gateways/game.gateway';

@Module({
  imports: [GamesModule],
  providers: [SocketService, ConnectionHandler, GameGateway],
  exports: [SocketService],
})
export class SocketModule {}
import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import {GamesModule} from "../games/games.module";
import {ConnectionHandler} from "./handlers/connection.handler";

@Module({
  imports: [GamesModule],
  providers: [SocketService, ConnectionHandler],
  exports: [SocketService],
})
export class SocketModule {}
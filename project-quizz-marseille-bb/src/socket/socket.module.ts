import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { GamesModule } from '../games/games.module';
import { ConnectionHandler } from './handlers/connection.handler';
import { GameGateway } from './gateways/game.gateway';
import { DeconnectionHandler } from './handlers/deconnection.handler';
import { CreateRoomHandler } from './handlers/create-room.handler';

@Module({
  imports: [GamesModule],
  providers: [
    SocketService,
    ConnectionHandler,
    DeconnectionHandler,
    CreateRoomHandler,
    GameGateway,
  ],
  exports: [SocketService],
})
export class SocketModule {}

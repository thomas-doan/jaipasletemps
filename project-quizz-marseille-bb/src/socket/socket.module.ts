import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { GamesModule } from '../games/games.module';
import { ConnectionHandler } from './handlers/connection.handler';
import { GameGateway } from './gateways/game.gateway';
import { DeconnectionHandler } from './handlers/deconnection.handler';
import { CreateRoomHandler } from './handlers/create-room.handler';
import { PlayerRoomHandler } from './handlers/player-room.handler';
import { JoinRoomHandler } from './handlers/join-room.handler';
import { LeaveRoomHandler } from './handlers/leave-room.handler';

@Module({
  imports: [GamesModule],
  providers: [
    SocketService,
    ConnectionHandler,
    DeconnectionHandler,
    CreateRoomHandler,
    PlayerRoomHandler,
    JoinRoomHandler,
    LeaveRoomHandler,
    GameGateway,
  ],
  exports: [SocketService],
})
export class SocketModule {}

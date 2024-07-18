import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { DatabaseModule } from 'src/database/database.module';
import { GameSocketService } from './services/game-socket/game-socket.service';
import { SocketModule } from 'src/socket/socket.module';

@Module({
  controllers: [GamesController],
  providers: [GamesService, GameSocketService],
  imports: [DatabaseModule, SocketModule]
})
export class GamesModule {}

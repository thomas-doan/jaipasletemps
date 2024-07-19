import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { DatabaseModule } from 'src/database/database.module';
@Module({
  imports: [DatabaseModule],
  controllers: [GamesController],
  providers: [
    { provide: 'IGamesService', useClass: GamesService },
    GamesService,
  ],
  exports: ['IGamesService', GamesService],
})
export class GamesModule {}

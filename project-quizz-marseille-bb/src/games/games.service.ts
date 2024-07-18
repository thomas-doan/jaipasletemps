import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class GamesService {
  constructor(private database: DatabaseService) {}
  async create(data: CreateGameDto): Promise<any> {
    return this.database.game.create({
      data: {
        ...data,
        score: JSON.stringify(data.score),
        joker_used: JSON.stringify(data.joker_used),
        disconnected_players: JSON.stringify(data.disconnected_players),
      },
    });
  }

  findAll() {
    return this.database.game.findMany();
  }

  async findOne(id: string) {
    return this.database.game.findUnique({ where: {id: id}});
  }

  update(id: string, updateGameDto: UpdateGameDto) {
    return this.database.game.update({
      where: { id },
      data: {
        ...updateGameDto,
        score: JSON.stringify(updateGameDto.score),
        joker_used: JSON.stringify(updateGameDto.joker_used),
        disconnected_players: JSON.stringify(updateGameDto.disconnected_players),
      },
    });
  }

  async remove(id: string) {
    return this.database.game.delete({ where: { id } });
  }
}

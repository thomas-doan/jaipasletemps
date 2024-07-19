import { Injectable } from '@nestjs/common';
import { CreatePlayerDto } from '../dto/create-player.dto';
import { UpdatePlayerDto } from '../dto/update-player.dto';
import { User } from '@prisma/client';
import { IPlayerService } from '../interfaces/player.service.interface';

@Injectable()
export class PlayerService implements IPlayerService {
  async handleDisconnection(socketId: string): Promise<void> {
    // implémentation de la méthode
  }
  create(createPlayerDto: CreatePlayerDto) {
    return 'This action adds a new player';
  }

  findAll() {
    return `This action returns all player`;
  }

  findOne(id: number) {
    return `This action returns a #${id} player`;
  }

  update(id: number, updatePlayerDto: UpdatePlayerDto) {
    return `This action updates a #${id} player`;
  }

  remove(id: number) {
    return `This action removes a #${id} player`;
  }

  createUser(data: {
    email: string;
    password: string;
    firstname?: string;
    lastname?: string;
  }): Promise<User> {
    return Promise.resolve(undefined);
  }

  findByEmail(email: string): Promise<User> {
    return Promise.resolve(undefined);
  }

  getUserHistories(userId: string): Promise<any> {
    return Promise.resolve(undefined);
  }
}

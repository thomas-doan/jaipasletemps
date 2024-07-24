import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { CreatePlayerDto } from '../dto/create-player.dto';
import { UpdatePlayerDto } from '../dto/update-player.dto';
import { User } from '@prisma/client';
import { IPlayerService } from '../interfaces/player.service.interface';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class PlayerService implements IPlayerService {
  constructor(private database: DatabaseService) {}
  async handleDisconnection(socketId: string): Promise<void> {
    // implémentation de la méthode
  }
  create(createPlayerDto: CreatePlayerDto) {
    return this.database.player.create({
      data: {
        ...createPlayerDto,
      },
    });
  }

  findAll() {
    return `This action returns all player`;
  }

  findOne(userId: string) {
    return this.database.player.findFirst({
      where: {userId: userId},
    });
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
  async findAllGameHistory(userId: string): Promise<any> {

    try {
      const player = await this.database.player.findFirst({
        where: {userId: userId},
      });
      const playerHistories = await this.database.playerHistories.findMany({
        where: {playerId: player.id},
        include: {
          historyGame: {
            include: {
              playerHistories: true,
              quiz: {
                select: {
                  name: true,
                  description: true,
                },
              }
            },
          },
        },
      });
      return playerHistories;
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        return error;
      } else {
        throw new HttpException('Failed to fetch game histories due to an unexpected error.', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}

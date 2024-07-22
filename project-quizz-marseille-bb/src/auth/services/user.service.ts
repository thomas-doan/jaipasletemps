import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { IUserService } from '../interfaces/user.service.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(private database: DatabaseService) {}

  async createUser(data: {
    email: string;
    password: string;
    name: string; 
  }): Promise<any> {
    return this.database.user.create({
      data: {
        email: data.email,
        password: data.password,
        players: {
          create: {
            name: data.name,
          },
        },
      },
      include: {
        players: true, 
      },
    });
  }

  async findByEmail(email: string): Promise<any> {
    return this.database.user.findUnique({
      where: { email },
      include: { players: true },
    });
  }
}

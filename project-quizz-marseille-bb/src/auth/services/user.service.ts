import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { IUserService } from '../interfaces/user.service.interface';

@Injectable()
export class UserService implements IUserService {
    constructor(private database: DatabaseService) {}

    async createUser(data: { email: string; pseudo: string; password: string }): Promise<any> {
        return this.database.user.create({ data });
    }

    async findByEmail(email: string): Promise<any> {
        return this.database.user.findUnique({ where: { email } });
    }
}

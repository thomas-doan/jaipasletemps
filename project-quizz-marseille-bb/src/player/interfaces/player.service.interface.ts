import { User } from '@prisma/client';

export interface IPlayerService {
    handleDisconnection(socketId: string): Promise<void>;
    createUser(data: { email: string; password: string; firstname?: string; lastname?: string }): Promise<User>;
    findByEmail(email: string): Promise<User>;
    getUserHistories(userId: string): Promise<any>;
}
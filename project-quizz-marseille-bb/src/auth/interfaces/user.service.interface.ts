export interface IUserService {
    createUser(data: { email: string, pseudo: string, password: string }): Promise<any>;
    findByEmail(email: string): Promise<any>;
}

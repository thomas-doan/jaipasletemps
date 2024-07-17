export interface IUserService {
    createUser(data: { email: string, password: string }): Promise<any>;
    findByEmail(email: string): Promise<any>;
}

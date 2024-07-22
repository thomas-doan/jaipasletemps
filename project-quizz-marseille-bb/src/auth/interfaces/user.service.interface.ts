export interface IUserService {
    createUser(data: { email: string, password: string, name:string }): Promise<any>;
    findByEmail(email: string): Promise<any>;
}

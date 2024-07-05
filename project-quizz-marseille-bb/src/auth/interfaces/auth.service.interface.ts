export interface IAuthService {
    register(email: string, pseudo: string, password: string): Promise<any>;
    validateUser(email: string, password: string): Promise<any>;
    generateToken(user: any): Promise<string>;
    login(user: any): Promise<{ access_token: string }>;
}

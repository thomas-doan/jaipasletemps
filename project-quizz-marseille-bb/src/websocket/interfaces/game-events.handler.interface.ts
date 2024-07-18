import { Socket } from 'socket.io';

export interface IGameEventsHandler {
    handle(socket: Socket, data?: any): Promise<void>;
}
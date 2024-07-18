import { Injectable } from "@nestjs/common";
import { Socket } from "socket.io";

@Injectable()
export class CreateRoomHandler {
    async handle(socket: Socket, data: any): Promise<void> {
        socket.join(data.roomId);
    }
}
import {
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { SocketService } from '../socket.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class GameGateway implements OnGatewayInit {
  @WebSocketServer() server: Server;

  constructor(private readonly socketService: SocketService) {}

  afterInit() {
    this.socketService.bindHandler(this.server);
  }
}

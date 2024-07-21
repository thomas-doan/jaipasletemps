import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { WebsocketService } from '../services/websocket.service';

@WebSocketGateway()
export class GameGateway implements OnGatewayInit {
  @WebSocketServer() server: Server;

  constructor(private readonly websocketService: WebsocketService) {}

  afterInit() {
    this.websocketService.bindHandlers(this.server);
  }
}

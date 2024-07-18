import { OnGatewayInit, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";
import { SocketService } from "../socket.service";

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true, 
  },
})
export class GameGateway implements OnGatewayInit {
  @WebSocketServer() server: Server;

  constructor(private readonly socketService: SocketService) {}

  afterInit() {
    this.socketService.bindHandler(this.server);
  }
}

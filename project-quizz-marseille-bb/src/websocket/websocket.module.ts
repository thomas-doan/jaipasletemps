// websocket/websocket.module.ts
import { Module } from '@nestjs/common';
import { PlayerModule } from '../player/player.module';
import { ConnectionHandler } from './handlers/connection.handler';
import { DisconnectionHandler } from './handlers/disconnection.handler';
import { CreateRoomHandler } from './handlers/create-room.handler';
import { JoinRoomHandler } from './handlers/join-room.handler';
import { StartGameHandler } from './handlers/start-game.handler';
import { ShowQuestionHandler } from './handlers/show-question.handler';
import { SubmitAnswerHandler } from './handlers/submit-answer.handler';
import { EndGameHandler } from './handlers/end-game.handler';
import { RestartGameHandler } from './handlers/restart-game.handler';
import { ShowAnswerHandler } from './handlers/show-answer.handler';
import { CloseChoiceHandler } from './handlers/close-choice.handler';
import { WebsocketService } from './services/websocket.service';
import { GameModule } from '../game/game.module';
import { GameGateway } from './gateways/game.gateway';

@Module({
  imports: [GameModule, PlayerModule],
  providers: [
    GameGateway,
    ConnectionHandler,
    DisconnectionHandler,
    CreateRoomHandler,
    JoinRoomHandler,
    StartGameHandler,
    ShowQuestionHandler,
    SubmitAnswerHandler,
    EndGameHandler,
    RestartGameHandler,
    ShowAnswerHandler,
    CloseChoiceHandler,
    WebsocketService,
  ],
  exports: [WebsocketService],
})
export class WebsocketModule {}

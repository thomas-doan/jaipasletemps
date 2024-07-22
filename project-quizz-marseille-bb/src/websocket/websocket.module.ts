import {forwardRef, Module} from '@nestjs/common';
import { GameModule } from '../game/game.module';
import { GameGateway } from './gateways/game.gateway';
import { ConnectionHandler } from './handlers/connection.handler';
import { DisconnectionHandler } from './handlers/disconnection.handler';
import { CreateRoomHandler } from './handlers/create-room.handler';
import { JoinRoomHandler } from './handlers/join-room.handler';
import { StartGameHandler } from './handlers/start-game.handler';
import { ShowNextQuestionHandler } from './handlers/show-next-question.handler';
import { SubmitAnswerHandler } from './handlers/submit-answer.handler';
import { EndGameHandler } from './handlers/end-game.handler';
import { RestartGameHandler } from './handlers/restart-game.handler';
import { CloseChoiceHandler } from './handlers/close-choice.handler';
import { WebsocketService } from './services/websocket.service';
import {AllGameStatusOpenHandler} from "./handlers/all-game-status-open.handler";

@Module({
  imports: [forwardRef(() => GameModule)],
  providers: [
    GameGateway,
    WebsocketService,
    ConnectionHandler,
    DisconnectionHandler,
    CreateRoomHandler,
    JoinRoomHandler,
    StartGameHandler,
    ShowNextQuestionHandler,
    SubmitAnswerHandler,
    EndGameHandler,
    RestartGameHandler,
    CloseChoiceHandler,
    AllGameStatusOpenHandler
  ],
  exports: [WebsocketService],
})
export class WebsocketModule {}

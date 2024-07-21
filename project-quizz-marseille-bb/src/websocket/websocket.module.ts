import {forwardRef, Module} from '@nestjs/common';
import { GameModule } from '../game/game.module';
import { GameGateway } from './gateways/game.gateway';
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
    ShowQuestionHandler,
    SubmitAnswerHandler,
    EndGameHandler,
    RestartGameHandler,
    ShowAnswerHandler,
    CloseChoiceHandler,
  ],
  exports: [WebsocketService],
})
export class WebsocketModule {}

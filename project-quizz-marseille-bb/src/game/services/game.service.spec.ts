import { Test, TestingModule } from '@nestjs/testing';
<<<<<<<< HEAD:project-quizz-marseille-bb/src/socket/socket.service.spec.ts
import { SocketService } from './socket.service';

describe('SocketService', () => {
  let service: SocketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocketService],
    }).compile();

    service = module.get<SocketService>(SocketService);
========
import { GameService } from './game.service';

describe('GameService', () => {
  let service: GameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameService],
    }).compile();

    service = module.get<GameService>(GameService);
>>>>>>>> 11e3b35cf4e3b2cc99232841cd97b6b751748d09:project-quizz-marseille-bb/src/game/services/game.service.spec.ts
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

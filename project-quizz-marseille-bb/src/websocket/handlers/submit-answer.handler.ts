import { Inject, Injectable } from '@nestjs/common';
import { IGameEventsHandler } from '../interfaces/game-events.handler.interface';
import { IGameService } from '../../game/interfaces/game.service.interface';
import { Server, Socket } from 'socket.io';
import { IQuestionService } from 'src/game/interfaces/question.service.interface';
import { IScoreService } from 'src/game/interfaces/score.service.interface';

@Injectable()
export class SubmitAnswerHandler implements IGameEventsHandler {
  constructor(
    @Inject('IGameService')
    private readonly gameService: IGameService,
    @Inject('IQuestionService')
    private readonly questionService: IQuestionService,
    @Inject('IScoreService')
    private readonly scoreService: IScoreService,
  ) {}

  async handle(
    socket: Socket,
    data: {
      gameId: string;
      playerId: string;
      answerText: string;
      questionId: string;
    },
    server: Server,
  ): Promise<void> {
    const { gameId, playerId, answerText, questionId } = data;

    if (!gameId || !playerId || !answerText || !questionId) {
      console.error('Invalid data received:', data);
      socket.emit('error', 'Invalid data received submit answer');
      return;
    }

    const questionAnswer =
      await this.questionService.getCorrectAnswer(questionId);

    server.to(gameId).emit('correctAnswer', questionAnswer.correctAnswer);

    if (questionAnswer.correctAnswer == answerText) {
      await this.scoreService.updateScore(gameId, playerId);
      const game = this.scoreService.getScoreGame(gameId);
      server.to(gameId).emit('updatedScore', game);
    }
  }
}

export class CreateGameDto {
    name: string;
    description: string;
    score: JSON[];
    joker_used: JSON[];
    disconnected_players: JSON[];
    quizId: string;
  }
  
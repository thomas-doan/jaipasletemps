import { FC } from "react";

interface GamePlayersScoreProps {
  players: any;
}

export const GamePlayersScore: FC<GamePlayersScoreProps> = (props) => {
  const { players } = props;
  return (
    <div>
      <p>{players.name}</p>
    </div>
  );
};

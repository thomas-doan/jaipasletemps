import { FC } from "react";
import { Button } from "../ui/button";
import { useSocket } from "@/contexts/Socket";
import { useAuth } from "@/contexts/AuthContext";

interface CardGamesProps {
  gameList: any;
  setOpen: (value: boolean) => void;
  setQuizId: (value: any) => void;
}

export const CardGames: FC<CardGamesProps> = (props) => {
  const { socket } = useSocket();
  const { user } = useAuth();
  const { gameList, setOpen, setQuizId } = props;
  return (
    <article className="rounded-lg border p-4">
      <h1>{gameList.name}</h1>
      <p>{gameList.description}</p>
      <p>{gameList.maxPlayers}</p>
      {!user.isAuth ? (
        <Button disabled>Connectez-vous pour jouer</Button>
      ) : (
        <Button
          onClick={() => {
            socket.emit("joinRoom", {
              data: { gameId: gameList.id, playerId: user.player.id },
            });
            setQuizId(gameList.quizId);
            setOpen(true);
          }}
        >
          Rejoindre
        </Button>
      )}
    </article>
  );
};

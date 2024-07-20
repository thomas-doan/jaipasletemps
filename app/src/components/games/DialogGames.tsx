import { FC, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { QuizGame } from "./QuizGame";
import { useSocket } from "@/contexts/Socket";
import { GamePlayersScore } from "./GamePlayersScore";

interface DialogGamesProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  quiz: any;
  gameId: string;
}
export const DialogGames: FC<DialogGamesProps> = (props) => {
  const { socket } = useSocket();
  const { open, setOpen, quiz, gameId } = props;
  const [roomJoined, setRoomJoined] = useState(false);
  const [playersList, setPlayersList] = useState<any>([]);

  useEffect(() => {
    socket.on("roomJoined", (data) => {
      console.log("Room joined", data);
      setRoomJoined(true);
    });
    socket.on("playersList", (data: any) => {
      console.log("Player joined", data);
      setPlayersList(data);
    });
    setRoomJoined(false);
  }, [socket]);

  console.log("dialog quizz", quiz);
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Quiz Game</DialogTitle>
            <DialogDescription>
              <div className="flex flex-col">
                <QuizGame quizData={quiz} gameId={gameId} />
                {playersList.length > 0 &&
                  playersList.map((player: any) => (
                    <GamePlayersScore key={player.id} players={player} />
                  ))}
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

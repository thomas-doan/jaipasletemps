import { FC, use, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { QuizGame } from "./QuizGame";
import { useSocket } from "@/contexts/Socket";
import { set } from "react-hook-form";

interface DialogGamesProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  quiz: any;
}
export const DialogGames: FC<DialogGamesProps> = (props) => {
  const { socket } = useSocket();
  const { open, setOpen, quiz } = props;
  const [roomJoined, setRoomJoined] = useState(false);
  const [playersList, setPlayersList] = useState<any>([]);

  useEffect(() => {
    socket.on("roomJoined", (data) => {
      console.log("Room joined", data);
      setRoomJoined(true);
    });
    socket.on("playerJoined", (data:any) => {
      console.log("Player joined", data);
      setPlayersList([...playersList, data.player]);
    });
    setRoomJoined(false);
  }, [socket]);

  console.log(quiz);
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Quiz Game</DialogTitle>
            <DialogDescription>
              <QuizGame quizData={quiz} />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

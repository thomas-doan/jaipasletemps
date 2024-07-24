import { FC, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useSocket } from "@/contexts/Socket";
import { CreateGame } from "@/components/games/CreateGame";
import { LobbyGame } from "@/components/games/LobbyGame";
import { QuizGame } from "@/components/games/QuizGame";

interface DialogGamesProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  setActiveStep: (value: any) => void;
  activeStep: StepName;
}

type StepName = "form" | "lobby" | "quiz" | "end";

type Step = {
  name: string;
  title: string;
};

const STEPS: Step[] = [
  { name: "form", title: "Créer une partie" },
  { name: "lobby", title: "Utilisateur dans la partie" },
  { name: "quiz", title: "A vous de jouez" },
  { name: "end", title: "Fin de la partie" },
] as const;

export const DialogGames: FC<DialogGamesProps> = (props) => {
  const { socket } = useSocket();
  const { open, setOpen, activeStep, setActiveStep } = props;
  const [gameId, setGameId] = useState("");
  const [playersList, setPlayersList] = useState<any[]>([]);

  const isStepActive = (stepName: StepName) => activeStep === stepName;

  useEffect(() => {
    socket.on("roomCreated", (data) => {
      console.log("roomCreated", data);
      setGameId(data.roomId);
      setActiveStep("lobby");
    });
    socket.on("gameStarted", (data) => {
      console.log("gameStarted", data);
      setActiveStep("quiz");
    });

    return () => {
      socket.off("roomCreated");
      socket.off("gameStarted");
    };
  }, [socket]);

  // Reset state when dialog is closed
  useEffect(() => {
    if (!open) {
      setGameId("");
      setPlayersList([]);
      setActiveStep("form");
    }
  }, [open]);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className={
            "lg:min-w-[960px] lg:min-h-[700px] min-w-screen min-h-[700px]"
          }
        >
          <DialogHeader>
            <DialogTitle>Quiz Game</DialogTitle>
            <DialogDescription className="w-full h-full">
              {isStepActive("form") && <CreateGame />}
              {isStepActive("lobby") && (
                <LobbyGame
                  gameId={gameId}
                  playersList={playersList}
                  setPlayersList={setPlayersList}
                />
              )}
              {isStepActive("quiz") && (
                <QuizGame
                  gameId={gameId}
                  playersList={playersList}
                  setPlayersList={setPlayersList}
                  setOpen={setOpen}
                />
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

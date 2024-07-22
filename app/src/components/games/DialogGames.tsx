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
import { GamePlayersScore } from "./GamePlayersScore";
import { Label } from "@radix-ui/react-dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";

interface DialogGamesProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

type StepName = "form" | "lobby" | "quizz" | "end";

export const DialogGames: FC<DialogGamesProps> = (props) => {
  const { socket } = useSocket();
  const { open, setOpen } = props;

  const [step, setStep] = useState<StepName>("form");
  const [quizList, setQuizList] = useState<any[]>([]);
  const [selectedQuiz, setSelectedQuiz] = useState("");

  useEffect(() => {
    (async () => {
      const resp = await fetch("http://localhost:3000/quiz");
      const data = await resp.json();
      console.log(data);
      setQuizList(data);
    })();
  }, []);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Quiz Game</DialogTitle>
            <DialogDescription>
              <div>
                <article className="flex w-full justify-between">
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Choisissez un quiz" />
                    </SelectTrigger>
                    <SelectContent>
                      {quizList.map((quiz) => (
                        <SelectItem
                          key={quiz.id}
                          value={quiz.id}
                          onClick={(e) =>
                            setSelectedQuiz(
                              (e.target as HTMLInputElement).value
                            )
                          }
                        >
                          {quiz.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button></Button>
                </article>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

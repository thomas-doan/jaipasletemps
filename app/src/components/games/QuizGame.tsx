import { useState, useEffect, use, FC } from "react";
import { Button } from "../ui/button";
import { useSocket } from "@/contexts/Socket";
import { useAuth } from "@/contexts/AuthContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Answer {
  id: string;
  text: string;
  questionId: string;
}

interface Question {
  id: string;
  text: string;
  correctAnswer?: string;
  answers: Answer[];
}

interface QuizProps {
  gameId: string;
  playersList: any[];
  setPlayersList: (value: any[]) => void;
}

export const QuizGame: FC<QuizProps> = (props) => {
  const { gameId, playersList, setPlayersList } = props;
  const { socket } = useSocket();
  const [question, setQuestion] = useState<Question>();
  const [answer, setAnswer] = useState<string>("");
  const [scores, setScores] = useState<{ [key: string]: number }>({});
  const [scorePlayer, setScorePlayer] = useState<any[]>([]);
  const [endGame, setEndGame] = useState<boolean>(false);
  const [resultAnswer, setResultAnswer] = useState({
    correct: null,
    message: "",
  });
  const { user } = useAuth();

  useEffect(() => {
    socket.on("showNextQuestion", (data) => {
      console.log("showNextQuestion", data);
      setQuestion(data);
    });

    socket.on("showScore", (data) => {
      console.log("showScore", data);
      const scoresObj = JSON.parse(data);
      setScores(scoresObj);
    });

    socket.on("answerResult", (data) => {
      console.log("answerResult", data);
      setResultAnswer({ correct: data.correct, message: "" });
    });

    socket.on("correctAnswerGiven", (data) => {
      console.log("correctAnswerGiven", data);
      setResultAnswer({
        correct: data.correct,
        message: "La réponse a déja était donnée",
      });
    });

    socket.on("endGame", (data) => {
      console.log("endGame", data);
      setEndGame(true);
    });

    return () => {
      socket.off("showNextQuestion");
      socket.off("showScore");
    };
  }, [socket]);

  const mergeScoresWithPlayers = (players: any[], scores: any) => {
    return players.map((player) => ({
      ...player,
      score: scores[player.id] || 0,
    }));
  };

  useEffect(() => {
    const updatedPlayers = mergeScoresWithPlayers(playersList, scores);
    setScorePlayer(updatedPlayers);
  }, [playersList, scores]);

  const handleSubmitAnswer = () => {
    if (!gameId || !answer) return;
    socket.emit("submitAnswer", {
      event: "submitAnswer",
      data: { gameId: gameId, playerId: user.player.id, answers: [answer] },
    });
  };

  useEffect(() => {
    setResultAnswer({ correct: null, message: "" });
  }, [question]);

  return (
    <div className="flex flex-col justify-between items-center w-full h-full">
      <div className="w-full">
        {question && (
          <div className="flex flex-col items-center w-full space-y-4">
            <h1>Question</h1>
            <h2 className="text-3xl text-black">{question.text}</h2>
            {/* {resultAnswer.correct !== null && resultAnswer.correct ? <p>Bonne réponse</p> :
                            <p>Mauvaise réponse</p>} */}
            <div className="grid grid-cols-2 gap-2 w-full">
              {question.answers.map((answer: any) => (
                <Button
                  value={answer.text}
                  key={answer.id}
                  onClick={() => setAnswer(answer.text)}
                  className="w-full bg-[#6366F1] text-white"
                >
                  {answer.text}
                </Button>
              ))}
            </div>
            <Button onClick={() => handleSubmitAnswer()} className="bg-[#D1FAE5] text-black px-4">Valider</Button>
          </div>
        )}
        {scorePlayer && (
          <div className="w-full">
            {endGame && (
              <>
                <h2>Fin du jeu</h2>
              </>
            )}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Joueur</TableHead>
                  <TableHead className="text-right">Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scorePlayer.map((player) => (
                  <TableRow key={player.id}>
                    <TableCell>{player.name}</TableCell>
                    <TableCell className="text-right">{player.score}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

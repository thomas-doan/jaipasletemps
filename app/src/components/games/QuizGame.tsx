import { useState, useEffect, FC } from "react";
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
import { Check } from "lucide-react";

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
  setOpen: (value: boolean) => void;
}

export const QuizGame: FC<QuizProps> = (props) => {
  const { gameId, playersList, setOpen } = props;
  const { socket } = useSocket();
  const [question, setQuestion] = useState<Question>();
  const [answer, setAnswer] = useState<string>("");
  const [scores, setScores] = useState<{ [key: string]: number }>({});
  const [scorePlayer, setScorePlayer] = useState<any[]>([]);
  const [endGame, setEndGame] = useState<boolean>(false);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [resultAnswer, setResultAnswer] = useState<any>();
  const [winner, setWinner] = useState<any>();
  const { user } = useAuth();

  useEffect(() => {
    socket.on("showNextQuestion", (data) => {
      console.log("showNextQuestion", data);
      setAnswer("");
      setQuestion(data);
      setCorrectAnswer(data.correctAnswer);
      setResultAnswer(null);
    });

    socket.on("showScore", (data) => {
      console.log("showScore", data);
      const scoresObj = JSON.parse(data);
      setScores(scoresObj);
    });

    socket.on("answerResult", (data) => {
      console.log("answerResult", data);
      setResultAnswer(data);
    });

    socket.on("correctAnswerGiven", (data) => {
      console.log("correctAnswerGiven", data);
      setResultAnswer(data);
    });

    socket.on("endGame", (data) => {
      console.log("endGame", data);
      const scoresObj = JSON.parse(data.score);
      setScores(scoresObj);
      setEndGame(true);
    });

    return () => {
      socket.off("showNextQuestion");
      socket.off("showScore");
      socket.off("answerResult");
      socket.off("correctAnswerGiven");
      socket.off("endGame");
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

  useEffect(() => {
    if (!endGame) return;
    if (scorePlayer.length > 0) {
      const highestScoringPlayer = scorePlayer.reduce((prev, current) => {
        return prev.score > current.score ? prev : current;
      });
      setWinner(highestScoringPlayer);
    }
  }, [endGame]);

  const handleSubmitAnswer = () => {
    if (!gameId || !answer) return;
    socket.emit("submitAnswer", {
      event: "submitAnswer",
      data: { gameId: gameId, playerId: user.player.id, answer: answer },
    });
  };

  return (
    <div className="flex flex-col justify-between items-center w-full h-full">
      <div className="w-full">
        {question && !endGame && (
          <div className="flex flex-col items-center w-full space-y-4">
            <h1>Question</h1>
            <h2 className="text-3xl text-black">{question.text}</h2>
            <div className="grid grid-cols-2 gap-2 w-full">
              {question.answers.map((answerOption: any) => (
                <Button
                  value={answerOption.text}
                  key={answerOption.id}
                  onClick={() => setAnswer(answerOption.text)}
                  className={`${
                    answer === answerOption.text
                      ? "bg-[#93c5fd] text-black hover:bg-blue-100"
                      : "bg-[#2563eb] text-white hover:bg-blue-500"
                  }`}
                >
                  {answerOption.text}
                </Button>
              ))}
              <div className="min-h-5 flex justify-center">
                {resultAnswer &&
                  (resultAnswer.correct ? (
                    <span className="text-green-500">Bonne réponse</span>
                  ) : (
                    <div className="flex flex-col">
                      <span className="text-red-500">Mauvaise réponse</span>
                      <span>
                        La bonne réponse était : {question.correctAnswer}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
            <Button
              onClick={() => handleSubmitAnswer()}
              className="bg-[#22c55e] hover:bg-green-400 border-emerald-600 text-black px-4 flex items-center space-x-2"
            >
              <Check />
              <span>Valider</span>
            </Button>
          </div>
        )}
        {scorePlayer && (
          <div className="w-full">
            {endGame && (
              <div className="flex flex-col justify-center items-center w-full">
                <h2 className="text-xl">Partie terminée</h2>
                <h3 className="text-xl">
                  {winner
                    ? `Le gagnant est ${winner.name}`
                    : "Personne n'a gagné"}
                </h3>
              </div>
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
        {/* {endGame && (
          <Button
            onClick={() => {
              socket.emit("restartGame", {
                event: "restartGame",
                data: { gameId: gameId },
              });
              setEndGame(false);
            }}
            className="bg-[#22c55e] hover:bg-green-400 border-emerald-600 text-black px-4 flex items-center space-x-2"
          >
            <Check />
            <span>Rejouer</span>
          </Button>
        )} */}
        {endGame && (
          <Button
            onClick={() => setOpen(false)}
          >
            <span>Fermer</span>
          </Button>
        )}
      </div>
    </div>
  );
};

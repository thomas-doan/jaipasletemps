import React, { useState, useEffect, use } from "react";
import { Button } from "../ui/button";
import { useSocket } from "@/contexts/Socket";
import { useAuth } from "@/contexts/AuthContext";

interface Answer {
  id: string;
  text: string;
}

interface Question {
  id: string;
  text: string;
  answers: Answer[];
}

interface QuizData {
  id: string;
  name: string;
  description: string;
  difficulty: string;
  maxPlayers: number;
  questions: Array<{
    question: Question;
    questionId: string;
    quizId: string;
  }>;
}

interface QuizProps {
  quizData: QuizData;
  gameId: string;
}

export const QuizGame: React.FC<QuizProps> = (props) => {
  const { quizData, gameId } = props;
  const { socket } = useSocket();
  const { user } = useAuth();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState<any>({
    answerText: "",
    questionId: "",
  });
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<string>("");
  const [scores, setScores] = useState<any>({});
  const [players, setPlayers] = useState<any>([]);
  const [playerScores, setPlayerScores] = useState<any>([]);
  const [updateScores, setUpdateScores] = useState(false);

  useEffect(() => {
    if (quizData && quizData.questions) {
      const formattedQuestions = quizData.questions.map((q) => q.question);
      setQuestions(formattedQuestions);
      setCurrentQuestion(formattedQuestions[0]);
      setLoading(false);
    }
  }, [quizData]);

  useEffect(() => {
    const showCorrectAnswer = () => {
      socket.on("correctAnswer", (data) => {
        setCorrectAnswer(data);
        // Attendre 4 secondes pour afficher la bonne réponse avant de passer à la question suivante
        setTimeout(() => {
          handleAnswerClick();
          setCorrectAnswer("");
          setUpdateScores(true);
        }, 4000);
      });
    };

    showCorrectAnswer();

    return () => {
      socket.off("correctAnswer");
    };
  }, [socket]);

  useEffect(() => {
    if (updateScores) {
      socket.emit("updatedScore", { gameId });
      setUpdateScores(false);
    }
  }, [updateScores]);

  useEffect(() => {
    if (currentQuestion) {
      const timeout = setTimeout(() => {
        socket.emit("answer", {
          data: {
            gameId: gameId,
            playerId: user.player.id,
            answerText: selectedAnswer.answerText
              ? selectedAnswer.answerText
              : "",
            questionId: currentQuestion.id,
          },
        });
      }, 5000);
      setTimer(timeout);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [currentQuestion, selectedAnswer]);

  const handleAnswerClick = () => {
    if (timer) clearTimeout(timer);
    const currentIndex = questions.findIndex(
      (q) => q.id === currentQuestion?.id
    );
    if (currentIndex < questions.length - 1) {
      setCurrentQuestion(questions[currentIndex + 1]);
      setSelectedAnswer({ answerText: "", questionId: "" }); // Réinitialise la réponse sélectionnée
    } else {
      console.log("Quiz terminé");
      socket.emit("gameEnded", { gameId });
      setCurrentQuestion(null);
    }
  };

  if (loading) {
    return <div>Chargement du quiz...</div>;
  }

  if (!currentQuestion) {
    return <div>Le quiz est terminé.</div>;
  }

  return (
    <div>
      <h2>{currentQuestion.text}</h2>
      {correctAnswer && <p>La réponse correcte était: {correctAnswer}</p>}
      <div>
        {currentQuestion.answers &&
          currentQuestion.answers.map((answer) => (
            <Button
              key={answer.id}
              onClick={() => {
                setSelectedAnswer({
                  answerText: answer.text,
                  questionId: currentQuestion.id,
                });
              }}
            >
              {answer.text}
            </Button>
          ))}
      </div>
    </div>
  );
};

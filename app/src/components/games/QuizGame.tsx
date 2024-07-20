import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";

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
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (quizData && quizData.questions) {
      const formattedQuestions = quizData.questions.map((q) => q.question);
      setQuestions(formattedQuestions);
      setCurrentQuestion(formattedQuestions[0]);
      setLoading(false);
    }
  }, [quizData]);

  const handleAnswerClick = () => {
    const currentIndex = questions.findIndex(
      (q) => q.id === currentQuestion?.id
    );
    if (currentIndex < questions.length - 1) {
      setCurrentQuestion(questions[currentIndex + 1]);
    } else {
      console.log("Quiz terminé");
      setCurrentQuestion(null);
    }
  };

  if (loading) {
    return <div>Chargement du quiz...</div>;
  }

  if (!currentQuestion) {
    return <div>Le quiz est terminé ou aucune question n'est disponible.</div>;
  }
  return (
    <div>
      <h2>{currentQuestion.text}</h2>
      <div>
        {currentQuestion.answers &&
          currentQuestion.answers.map((answer) => (
            <Button key={answer.id} onClick={handleAnswerClick}>
              {answer.text}
            </Button>
          ))}
      </div>
    </div>
  );
};

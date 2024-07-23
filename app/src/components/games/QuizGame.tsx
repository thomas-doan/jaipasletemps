import {useState, useEffect, use, FC} from "react";
import {Button} from "../ui/button";
import {useSocket} from "@/contexts/Socket";
import {useAuth} from "@/contexts/AuthContext";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


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
    const {gameId, playersList, setPlayersList} = props;
    const {socket} = useSocket();
    const [question, setQuestion] = useState<Question>(null);
    const [answer, setAnswer] = useState<string>("");
    const [scores, setScores] = useState<{ [key: string]: number }>({});
    const [scorePlayer, setScorePlayer] = useState<any[]>([]);
    const {user} = useAuth();

    useEffect(() => {
        socket.on('gameStarted', (data) => {
            console.log('gameStarted', data);
        });

        socket.on('showNextQuestion', (data) => {
            console.log('showNextQuestion', data);
            setQuestion(data);
        });

        socket.on('showScore', (data) => {
            console.log('showScore', data);
            const scoresObj = JSON.parse(data);
            setScores(scoresObj);
        });

        socket.on('answerResult', (data) => {
            console.log('answerResult', data);
        });

        socket.on('endGame', (data) => {
            console.log('endGame', data);
        });

        return () => {
            socket.off('showNextQuestion');
            socket.off('showScore');
        }
    }, [socket]);

    console.log('question', question);
    console.log('scores', scores);
    console.log('scorePlayer', scorePlayer);

    const mergeScoresWithPlayers = (players, scores) => {
        return players.map(player => ({
            ...player,
            score: scores[player.id] || 0
        }));
    };

    useEffect(() => {
        const updatedPlayers = mergeScoresWithPlayers(playersList, scores);
        setScorePlayer(updatedPlayers);
    }, [playersList, scores]);

    const handleSubmitAnswer = () => {
        if (!gameId || !answer) return;
        socket.emit('submitAnswer', {
            event: 'submitAnswer',
            data: {gameId: gameId, playerId: user.player.id, answers: [answer]}
        });
    }


    return (
        <div className="flex flex-col justify-between items-center">
            <h1>Question</h1>
            <div>
                {question && (
                    <div className="flex flex-col">
                        <h2>{question.text}</h2>
                        <ul className="flex space-x-2">
                            {question.answers.map((answer: any) => (
                                <li key={answer.id}>
                                    <Button value={answer.text}
                                            onClick={() => setAnswer(answer.text)}>{answer.text}</Button>
                                </li>
                            ))}
                        </ul>
                        <Button onClick={() => handleSubmitAnswer()}>Valider</Button>
                    </div>
                )}
                {scorePlayer && (
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
                )}
            </div>
        </div>
    );
};

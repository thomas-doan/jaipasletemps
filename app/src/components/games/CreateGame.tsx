import {FC, useEffect, useState} from "react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {useAuth} from "@/contexts/AuthContext";
import {useSocket} from "@/contexts/Socket";

export const CreateGame: FC = () => {
    const {socket} = useSocket();
    const {user} = useAuth();
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

    const handleCreateRoom = () => {
        if (!selectedQuiz || !user.isAuth) return;
        socket.emit("createRoom", {quizId: selectedQuiz, userId: user.id});
    }
    return <>
        <article className="flex w-full justify-between">
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Choisissez un quiz"/>
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
            <Button onClick={() => handleCreateRoom()}></Button>
        </article>
    </>
}
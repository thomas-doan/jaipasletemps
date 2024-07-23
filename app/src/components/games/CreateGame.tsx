import {FC, useEffect, useState} from "react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {useAuth} from "@/contexts/AuthContext";
import {useSocket} from "@/contexts/Socket";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";

export const CreateGame: FC = () => {
    const {socket} = useSocket();
    const {user} = useAuth();
    const [quizList, setQuizList] = useState<any[]>([]);
    const [selectedQuiz, setSelectedQuiz] = useState("");
    const [gameName, setGameName] = useState("");

    useEffect(() => {
        (async () => {
            const resp = await fetch("http://localhost:3000/quiz");
            const data = await resp.json();
            setQuizList(data);
        })();
    }, []);

    const handleCreateRoom = () => {
        if (!selectedQuiz || !gameName) return;
        console.log('createRoom', {quizId: selectedQuiz, gameName: gameName, userId: user.id});
        socket.emit("createRoom", { event: 'createRoom', data: {quizId: selectedQuiz, gameName: gameName, userId: user.id}});
        setGameName("");
        setSelectedQuiz("");
    };

    return <>
        <article className="flex w-full justify-between items-center h-32">
            <div className={"flex flex-col"}>
                <Label htmlFor={"quiz"}>Quiz</Label>
                <Select onValueChange={(value) => setSelectedQuiz(value)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Choisissez un quiz"/>
                    </SelectTrigger>
                    <SelectContent>
                        {quizList.map((quiz) => (
                            <SelectItem
                                key={quiz.id}
                                value={quiz.id}

                            >
                                {quiz.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className={"flex flex-col"}>
                <Label htmlFor={"gameName"}>Nom de la partie</Label>
                <Input id={"gameName"} type={"text"} placeholder={"Nom de la partie"}
                       onChange={(e) => setGameName(e.target.value)}/>
            </div>
            <Button onClick={() => handleCreateRoom()}>Créer un partie</Button>
        </article>
    </>
}
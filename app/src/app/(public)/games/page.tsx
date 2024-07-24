"use client";

import {Button} from "@/components/ui/button";
import {useAuth} from "@/contexts/AuthContext";
import {useSocket} from "@/contexts/Socket";
import {useEffect, useState} from "react";
import {DialogGames} from "@/components/games/DialogGames";
import {CardGames} from "@/components/games/CardGames";


type StepName = "form" | "lobby" | "quiz" | "end";

function GamePage() {
    const {socket} = useSocket();
    const {user} = useAuth();
    const [openDialogGames, setOpenDialogGames] = useState(false);
    const [activeRoomsList, setActiveRoomsList] = useState([]);
    const [quizId, setQuizId] = useState("");
    const [activeStep, setActiveStep] = useState<StepName>("form");

    useEffect(() => {
        socket.emit("allGameStatusOpen", {event: "allGameStatusOpen", data: {}});

        return () => {
            socket.off("allGameStatusOpen");
        }
    }, [socket]);

    useEffect(() => {
        socket.on("allGameStatusOpen", (data) => {
            console.log("allGameStatusOpen", data);
            const updatedGames = JSON.parse(data.message);
            setActiveRoomsList(updatedGames);
        });

        return () => {
            socket.off("allGameStatusOpen");
        };
    }, [socket]);

    return (
        <section
            className="flex flex-col lg:px-52">
            <article>
                <div className="flex justify-between items-center h-32">
                    {user.isAuth ? (
                        <Button onClick={() => setOpenDialogGames(true)}>Créer un partie</Button>
                    ) : (
                        <Button variant="secondary">Vous connectez pour jouer</Button>
                    )}
                    <DialogGames open={openDialogGames} setOpen={setOpenDialogGames} activeStep={activeStep}
                                 setActiveStep={setActiveStep}/>
                </div>
            </article>
            <article className="flex flex-col">
                <h2 className="text-2xl font-semibold">Liste des parties</h2>
                <div className="grid grid-cols-3 gap-4">
                    {activeRoomsList.map((room) => (
                        <CardGames key={room.id}
                                   setOpenDialogGames={setOpenDialogGames} setQuizId={setQuizId} room={room}
                                   setActiveStep={setActiveStep}/>
                    ))}
                </div>
            </article>
        </section>
    );
}

export default GamePage;

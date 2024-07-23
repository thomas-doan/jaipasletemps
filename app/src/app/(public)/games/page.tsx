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
        socket.on("activeRooms", (data) => {
            console.log("activeRooms", data);
            setActiveRoomsList(data);
        });

        return () => {
            socket.off("activeRooms");
        };
    }, [socket]);

    return (
        <section
            className="grid grid-flow-col lg:grid-cols-[auto,1fr] lg:gap-4 bg-flora-white 2xl:px-52 xl:px-12 pt-12">
            <div>
                {user.isAuth ? (
                    <Button onClick={() => setOpenDialogGames(true)}>Créer un partie</Button>
                ) : (
                    <Button>Vous connectez pour jouer</Button>
                )}
                <DialogGames open={openDialogGames} setOpen={setOpenDialogGames} activeStep={activeStep}
                             setActiveStep={setActiveStep}/>
            </div>
            <div>
                <h2 className="text-2xl font-semibold">Liste des parties</h2>
                <div className="grid gap-4">
                    {activeRoomsList.map((room) => (
                        <CardGames key={room.id}
                                   setOpenDialogGames={setOpenDialogGames} setQuizId={setQuizId} room={room}
                                   setActiveStep={setActiveStep}/>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default GamePage;

import {FC, useEffect, useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import {useSocket} from "@/contexts/Socket";
import {useAuth} from "@/contexts/AuthContext";
import {CreateGame} from "@/components/games/CreateGame";
import {LobbyGame} from "@/components/games/LobbyGame";
import {QuizGame} from "@/components/games/QuizGame";

interface DialogGamesProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    setActiveStep: (value: any) => void;
    activeStep: StepName;
}

type StepName = "form" | "lobby" | "quiz" | "end";

type Step = {
    name: string;
    title: string;
};

const STEPS: Step[] = [
    {name: "form", title: "Créer une partie"},
    {name: "lobby", title: "Utilisateur dans la partie"},
    {name: "quiz", title: "A vous de jouez"},
    {name: "end", title: "Fin de la partie"},
] as const;

export const DialogGames: FC<DialogGamesProps> = (props) => {
    const {socket} = useSocket();
    const {open, setOpen, activeStep, setActiveStep} = props;
    const {user} = useAuth();

    const [steps, setSteps] = useState([...STEPS]);
    const [gameId, setGameId] = useState("");
    const [startGame, setStartGame] = useState(false);
    const [playersList, setPlayersList] = useState<any[]>([]);

    const isStepActive = (stepName: StepName) => activeStep === stepName;
    const nextStep = () => {
        const currentStepIndex = steps.findIndex(
            (step) => step.name === activeStep
        );
        if (currentStepIndex < steps.length - 1) {
            setActiveStep(steps[currentStepIndex + 1].name as StepName);
        }
    };
    const previousStep = () => {
        const currentStepIndex = steps.findIndex(
            (step) => step.name === activeStep
        );
        if (currentStepIndex > 0) {
            setActiveStep(steps[currentStepIndex - 1].name as StepName);
        }
    };
    useEffect(() => {
        socket.on('roomCreated', (data) => {
            console.log('roomCreated', data);
            setGameId(data.roomId);
            setActiveStep("lobby");
        });
        socket.on('gameStarted', (data) => {
            console.log('gameStarted', data);
            setActiveStep("quiz");
        });

        return () => {
            socket.off('roomCreated');
            socket.off('gameStarted');
        };
    }, [socket]);

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className={"lg:min-w-[960px] lg:min-h-[700px]"}>
                    <DialogHeader>
                        <DialogTitle>Quiz Game</DialogTitle>
                        <DialogDescription>
                            {isStepActive("form") && (
                                <CreateGame/>
                            )}
                            {isStepActive("lobby") && (
                                <LobbyGame gameId={gameId} playersList={playersList} setPlayersList={setPlayersList}/>
                            )}
                            {isStepActive("quiz") && (
                                <QuizGame gameId={gameId} playersList={playersList} setPlayersList={setPlayersList} />
                            )}
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    );
};

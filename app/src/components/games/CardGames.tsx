import {FC} from "react";
import {Button} from "../ui/button";
import {useSocket} from "@/contexts/Socket";
import {useAuth} from "@/contexts/AuthContext";

interface CardGamesProps {
    room: any;
    setOpenDialogGames: (value: boolean) => void;
    setQuizId: (value: any) => void;
    setActiveStep: (value: any) => void;
}

export const CardGames: FC<CardGamesProps> = (props) => {
    const {socket} = useSocket();
    const {user} = useAuth();
    const {room, setOpenDialogGames, setQuizId, setActiveStep} = props;
    return (
        <article className="rounded-lg border p-4">
            <h1>{room.name}</h1>
            {!user.isAuth ? (
                <Button disabled>Hum ?</Button>
            ) : (
                <Button
                    onClick={() => {
                        if (!room.id) return;
                        socket.emit("joinRoom", {
                            event: "joinRoom",
                            data: {gameId: room.id, playerName: user.player.name, userId: user.id},
                        });
                        setQuizId(room.quizId);
                        setOpenDialogGames(true);
                        setActiveStep("lobby");
                    }}
                >
                    Rejoindre
                </Button>
            )}
        </article>
    );
};

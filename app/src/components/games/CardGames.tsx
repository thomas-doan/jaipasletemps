import {FC} from "react";
import {Button} from "../ui/button";
import {useSocket} from "@/contexts/Socket";
import {useAuth} from "@/contexts/AuthContext";
import {MoveRight} from "lucide-react";

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
        <article className="rounded-lg border border-[#E3E2E0] p-4 bg-[#F6F5F4]">
            <h1 className="text-2xl">{room.name}</h1>
            {!user.isAuth ? (
                <Button disabled>Connectez-vous pour jouer</Button>
            ) : (
                <Button
                    className={"flex items-center space-x-2"}
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
                    <div>
                        <MoveRight />
                    </div>
                    <span>
                        Rejoindre
                    </span>
                </Button>
            )}
        </article>
    );
};

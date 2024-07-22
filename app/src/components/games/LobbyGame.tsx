import {FC, useEffect, useState} from "react";
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
import {Button} from "@/components/ui/button";

interface LobbyGameProps {
    gameId: string;
}
export const LobbyGame: FC<LobbyGameProps> = (props) => {
    const {gameId} = props;
    const {socket} = useSocket();
    const {user} = useAuth();
    const [playersList, setPlayersList] = useState<any[]>([]);
    const [playerJoined, setPlayerJoined] = useState(false);

    useEffect(() => {
        socket.on('playerJoined', (data) => {
            console.log('playerJoined', data);
            setPlayerJoined(true);
        });
        socket.on('playersList', (data) => {
            console.log('playersList', data);
            setPlayersList(data);
        });

        return () => {
            socket.off('playerJoined');
            socket.off('playersList');
        };
    }, [socket]);

    const handleStartGame = () => {
        if (!gameId) return;
        socket.emit('startGame', {gameId: gameId});
    };

    return (
        <div>
            {playersList && playersList.length > 0 && (
            <Table>
                <TableCaption>Liste des joueurs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Pseudo</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">INV001</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            )}
            <Button onClick={() => handleStartGame()}>Commencer la partie</Button>
        </div>
    );
}
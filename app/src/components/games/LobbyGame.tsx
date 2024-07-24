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
    playersList: any[];
    setPlayersList: (value: any[]) => void;
}

export const LobbyGame: FC<LobbyGameProps> = (props) => {
    const {gameId, playersList, setPlayersList} = props;
    const {socket} = useSocket();
    const {user} = useAuth();

    useEffect(() => {
        if (user.isAuth) {
            const players = Array.isArray(user.player) ? user.player : [user.player];
            setPlayersList(players);
        }
    }, [user]);

    useEffect(() => {
        socket.on('playerJoined', (data) => {
            console.log('playerJoined', data);
        });

        socket.on('playersInRoom', (data) => {
            console.log('playersInRoom', data);
            setPlayersList(data);
        });

        return () => {
            socket.off('playerJoined');
            socket.off('playersList');
        };
    }, [socket]);

    const handleStartGame = () => {
        if (!gameId) return;
        socket.emit('startGame', { event: 'startGame', data: { gameId: gameId } });
    };

    console.log('playersList', playersList);

    return (
        <div className="w-full">
            {playersList && (
                <Table>
                    <TableCaption>Liste des joueurs</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Pseudo</TableHead>
                            <TableHead className="text-right">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {playersList.map((player) => (
                            <TableRow key={player.id}>
                                <TableCell className="w-[100px]">{player.name}</TableCell>
                                <TableCell  className="text-right">En ligne</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
            <Button onClick={() => handleStartGame()}>Commencer la partie</Button>
        </div>
    );
}
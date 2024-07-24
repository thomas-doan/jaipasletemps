"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function ProfilePage() {
  const { user } = useAuth();
  const [historyGames, setHistoryGames] = useState<any[]>([]);

  useEffect(() => {
    if (!user.isAuth) return;
    (async () => {
      const resp = await fetch(
        `http://localhost:3000/player/game-history/${user.id}`
      );
      const data = await resp.json();
      console.log(data);
      setHistoryGames(data);
    })();
  }, [user]);

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <div className="pt-20 w-screen px-48">
      <h1 className="text-3xl font-bold">Historique des parties</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Nom du quiz</TableHead>
            <TableHead>Score</TableHead>
            <TableHead className="text-right">Joué le</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {historyGames.map((game: any) => (
            <TableRow key={game.historyGameId} className="w-[200px]">
              <TableCell>{game.historyGame.quiz.name}</TableCell>
              <TableCell>{"N/A"}</TableCell>
              <TableCell className="text-right">
                {formatDate(game.historyGame.createdAt)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
export default ProfilePage;

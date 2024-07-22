"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useSocket } from "@/contexts/Socket";
import { useEffect, useState } from "react";
import { DialogGames } from "@/components/games/DialogGames";
import { CardGames } from "@/components/games/CardGames";

function GamePage() {
  const { socket } = useSocket();
  const [room, setRoom] = useState<any>(null);
  const [joinRoom, setJoinRoom] = useState<any>(null);
  const [roomList, setRoomList] = useState<any>(null);
  const [quiz, setQuiz] = useState<any>(null);
  const [quizId, setQuizId] = useState<any>(null);
  const [gameId, setGameId] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    socket.on("connection", () => {
      console.log("Connected to socket" + socket.id);
    });

    socket.on("roomCreated", (data) => {
      console.log("Room created", data);
      setQuizId(data.quizId);
      setGameId(data.gameId);
    });

    socket.on("activeRoomsList", (data) => {
      console.log("Room list received", data);
      setRoomList(data);
    });

    socket.on("roomJoined", (data) => {
      console.log("Room joined", data);
      setGameId(data.gameId);
    });
    socket.on("disconnect", () => {
      console.log("Disconnected from socket");
    });
  }, [socket]);

  useEffect(() => {
    if (quizId) {
      (async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/quiz/getQuiz/${quizId}`
          );
          const data = await response.json();
          console.log(data);
          setQuiz(data);
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [quizId]);

  console.log("roomList", roomList);
  return (
    <section className="grid grid-flow-col lg:grid-cols-[auto,1fr] lg:gap-4 bg-flora-white 2xl:px-52 xl:px-12 pt-12">
      <div>
        <Button
          onClick={() => {
            socket.emit("createRoom", {
              data: {
                quizId: "770e8400-e29b-41d4-a716-446655440000",
                gameName: "totoro",
                playerId: user.player.id,
                userId: user.id,
              },
            });
            setJoinRoom(true);
            setOpen(true);
          }}
        >
          Créer une nouvelle partie
        </Button>
      </div>
      <DialogGames open={open} setOpen={setOpen} quiz={quiz} gameId={gameId} />
      <div>
        {roomList && roomList.length > 0 ? (
          roomList.map((room: any) => (
            <CardGames
              key={room.id}
              gameList={room}
              setOpen={setOpen}
              setQuizId={setQuizId}
            />
          ))
        ) : (
          <div>Pas de partie en cours</div>
        )}
      </div>
    </section>
  );
}

export default GamePage;

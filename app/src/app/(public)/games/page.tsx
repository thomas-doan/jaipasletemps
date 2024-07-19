"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useSocket } from "@/contexts/Socket";
import { useEffect, useState } from "react";
import { DialogGames } from "@/components/games/DialogGames";

function GamePage() {
  const { socket } = useSocket();
  const [room, setRoom] = useState<any>(null);
  const [joinRoom, setJoinRoom] = useState<any>(null);
  const [roomList, setRoomList] = useState<any>(null);
  const [quiz, setQuiz] = useState<any>(null);
  const [quizId, setQuizId] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  console.log(user);

  useEffect(() => {
    socket.on("connection", () => {
      console.log("Connected to socket" + socket.id);
    });

    socket.on("roomCreated", (data) => {
      console.log("Room created", data);
      setQuizId(data.quizId);
    });

    socket.on("roomList", (data) => {
      console.log("Room list received", data);
      setRoomList(data.roomList);
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

  return (
    <div>
      <h1>Game Page</h1>
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
      <DialogGames open={open} setOpen={setOpen} quiz={quiz} />
    </div>
  );
}

export default GamePage;

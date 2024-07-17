"use client";

import { useSocket } from "@/contexts/Socket";
import { useEffect } from "react";

function SocketPage() {
  const { socket, isConnected } = useSocket();

  useEffect(() => {
    if (isConnected) {
      console.log("Socket is connected!", socket.id);

      socket.on("some_event", (data) => {
        console.log("Received event:", data);
      });
    }

    return () => {
      socket.off("some_event");
    };
  }, [socket, isConnected]);

  return (
    <div>
      <h1>Socket Test Page</h1>
      <p>Connection status: {isConnected ? "Connected" : "Disconnected"}</p>
    </div>
  );
}

export default SocketPage;
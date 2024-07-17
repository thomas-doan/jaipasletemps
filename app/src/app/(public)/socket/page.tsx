"use client";

import { useSocket } from "@/contexts/Socket";
import { useEffect } from "react";

function SocketPage() {
  const socket = useSocket();
    console.log(socket);

//   useEffect(() => {
//     socket.on("connect", () => {
//       console.log(`⚡: ${socket.id} user just connected!`);
//     });
//     socket.on("disconnect", () => {
//       console.log(`👋: ${socket.id} user just disconnected!`);
//     });
//   }, [socket]);

  return (
    <div>
      <h1>Test Page</h1>
    </div>
  );
}

export default SocketPage;

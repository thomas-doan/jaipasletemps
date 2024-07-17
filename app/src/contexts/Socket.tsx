"use client";

import React, { createContext, useContext, useEffect, useRef } from "react";
import io from "socket.io-client";

const SocketContext = createContext<any>(undefined);

export const SocketProvider = ({ children }: any) => {
  const socketRef = useRef<any>();

  useEffect(() => {
    if (socketRef.current === undefined) {
      socketRef.current = io("http://localhost:3000");
        console.log("socketRef.current", socketRef.current);
    //   return () => {
    //     if (socketRef.current) {
    //       socketRef.current.disconnect();
    //     }
    //   };
    }
  }, []);

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};

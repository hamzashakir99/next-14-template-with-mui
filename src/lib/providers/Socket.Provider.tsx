'use client';

import React, { useState, useEffect, createContext } from 'react';
import { io, Socket } from 'socket.io-client';
import { useSession } from 'next-auth/react';


export const SocketContext = createContext<Socket | null>(null);

interface Props {
  children: React.ReactNode;
}

const Providers = ({ children }: Props) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const {
    data: session
  }: {
    data: any;
  } = useSession();

  function onConnect() {
    console.log('user socket connected');
  }
  function reconnecting() {
    console.log("Trying to reconnecting to server...");
  }
  function reconnected() {
    console.log("Reconnected to server!");
  }
  function onDisconnect() {
    console.log("You are disconnected from the server!");
  }
  useEffect(() => {
    function cleanUp() {
      if (socket) {
        socket.disconnect();
        console.log('Socket disconnected');
      }
    }
    window.addEventListener('beforeunload', cleanUp);
    if (!socket && session) {
      setSocket(
        io(process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:8000', {
          auth: {
            token: session?.user?.token
          },
          reconnection: true,
          reconnectionDelay: 1000,
          reconnectionDelayMax: 5000,
          reconnectionAttempts: Infinity
        })
      );
    }
    if (socket && !socket.connected) {
      socket.on('connect', onConnect);
      socket.on('disconnect', onDisconnect);
      socket.on('reconnect_attempt', reconnecting);
      socket.on('reconnect', reconnected);
      return () => {
        cleanUp();
        window.removeEventListener('beforeunload', cleanUp);
        socket.off('connect', onConnect);
        socket.off('disconnect', onDisconnect);
        socket.off('reconnect_attempt', reconnecting);
        socket.off('reconnect', reconnected);
      };
    }
  }, [session, socket]);
  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export default Providers;

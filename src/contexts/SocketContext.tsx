import React, { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'
import { API_ADDRESS } from "@env";

import { useAuthContext } from './AuthContext';

interface ISocketContext {
  socket: any;
}

const SocketContext = React.createContext<ISocketContext | undefined>(undefined);

export function useSocket() {
  return useContext(SocketContext)
}

export function SocketProvider(props: any) {
  const [socket, setSocket] = useState<any>();

  const { authToken } = useAuthContext();

  useEffect(() => {
    if (authToken) {
      const token = "Bearer " + authToken;
      const newSocket = io(
        API_ADDRESS,
        { auth: { token } }
      );
      setSocket(newSocket);

      newSocket.on("connect_error", (error: any) => {
        console.log(error);
      });
      return () => {
        newSocket.close()
      };
    }
  }, [authToken])

  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  )
}
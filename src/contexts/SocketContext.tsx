import React, { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'
import { API_ADDRESS } from "@env";

import { getAccessToken } from '../../api/AuthUtils';

interface ISocketContext {
    socket: any;
}

const SocketContext = React.createContext<ISocketContext | undefined>(undefined);

export function useSocket() {
  return useContext(SocketContext)
}

// async function getSocket() {
//   const authTokenStorage = await SecureStore.getItemAsync("authToken");
//   const token = "Bearer " + authTokenStorage;
//   const newSocket = io(
//     API_ADDRESS,
//     { auth: { token } }
//   );
//   return
// }

export function SocketProvider(props: any) {
  const [socket, setSocket] = useState<any>();

  // const auth = useAuthContext();

  // const connect = async () => {
  //   const authTokenStore = await SecureStore.getItemAsync("authToken");
  // }

  useEffect(() => {
    const token = "Bearer " + getAccessToken();
      const newSocket = io(
          API_ADDRESS,
          { auth: { token } }
      );
      setSocket(newSocket);

      newSocket.on("connect_error", (error: any) => {
        console.log(error);
      });
    return () => {
      socket.close()
    };
  }, [])

  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  )
}
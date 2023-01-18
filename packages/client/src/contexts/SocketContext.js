import React from 'react';
import io from 'socket.io-client';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const socket = io(SERVER_URL);

export const SocketContext = React.createContext();

export function SocketProvider({ children }) {
     return (
      <SocketContext.Provider value={socket}>
        {children}
      </SocketContext.Provider>
    );
  }
import React from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:8000');

export const SocketContext = React.createContext();

export function SocketProvider({ children }) {
     return (
      <SocketContext.Provider value={socket}>
        {children}
      </SocketContext.Provider>
    );
  }
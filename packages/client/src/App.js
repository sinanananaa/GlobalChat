import React from 'react';
import ChatPage from './pages/ChatPage';
import './style/App.css';
import { ChatProvider } from './provider/ChatProvider';
import {SocketContext, socket} from './socket';

function App() {
  return (
    <>
    <SocketContext.Provider value={socket}>
        <ChatProvider>
          <ChatPage />
        </ChatProvider>
    </SocketContext.Provider>
    </>
  );
}

export default App;

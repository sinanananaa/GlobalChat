import React from 'react';
import ChatPage from './pages/ChatPage';
import './style/App.css';
import { ChatProvider } from './contexts/ChatContext';
import { SocketProvider } from './contexts/SocketContext';
function App() {
  return (
    <>
      <ChatProvider>
        <SocketProvider>
          <ChatPage />
        </SocketProvider>
      </ChatProvider>
    </>
  );
}

export default App;

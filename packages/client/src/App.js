import React from 'react';
import ChatPage from './pages/ChatPage';
import './style/App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ChatProvider } from './provider/ChatProvider';
import {SocketContext, socket} from './socket';

const queryClient = new QueryClient();

function App() {
  return (
    <>
    <SocketContext.Provider value={socket}>
      <QueryClientProvider client={queryClient}>
        <ChatProvider>
          <ChatPage />
        </ChatProvider>
      </QueryClientProvider>
    </SocketContext.Provider>
    </>
  );
}

export default App;

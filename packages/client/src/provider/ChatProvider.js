import React, { createContext, useState } from 'react';

export const ChatContext = createContext();

export function ChatProvider({ children }) {
  const globalChat = {
    name: "Global",
    messages: []
  };
  const [chats, setChats] = useState([globalChat]);
  const [currentChat, setCurrentChat] = useState(globalChat);
  const [username, setUsername] = useState("");

  let value = {
    chats,
    setChats,
    currentChat,
    setCurrentChat,
    username,
    setUsername
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
}
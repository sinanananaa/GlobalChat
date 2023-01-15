import React from 'react';
import { List } from 'antd';
import { useEffect, useRef } from 'react';
import {socket} from '../socket';
import { useContext } from 'react';
import { ChatContext } from '../provider/ChatProvider';


const ChatContent = () => {  

  const { username, setUsername, currentChat, setCurrentChat, chats, setChats} = useContext(ChatContext);
  
  // socket.on("client_name", (name) => {
  //   setUsername(name);
  //   console.log("Client recieves it's name", name);
  // });

  const messagesEndRef = useRef(null)
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  // socket.on('all_messages', (messages) => {
  //   console.log('Client recieves all message', messages);
  //   let updatedChats = [...chats];
  //   updatedChats[0].messages = messages;
  //   setChats(updatedChats);
  // });

  // socket.on('recieve_message', (message) => {
  //   console.log('Client recieves new message', message);
  //   const updatedChats = [...chats];
  //   const currentChatIndex = chats.findIndex(chat => chat.name === message.from);
  //   console.log(updatedChats);
  //   console.log(currentChatIndex);  
  //   updatedChats[currentChatIndex].messages.push(message);
  //   setChats(updatedChats);
  // });

  return (
    <>
    <List
      dataSource={currentChat.messages}
      style={{flex: 1, overflow: 'auto'}}
      header={<button>Load more</button>}
      footer={<div ref={messagesEndRef}></div>}
      bordered = {true}
      renderItem={(item) => (
          item.from === username ?
          <List.Item key={item._id} style={{border: 'none'}}>
            <div className='mymessage'>
              {item.message}
            </div>
          </List.Item> : 
          <List.Item key={item._id} style={{border: 'none'}}>
            <div className='othermessage'>
              <b>{item.from}:</b> {item.message}
            </div>
          </List.Item>
          
      )}
    />
    </>
  );
};
export default ChatContent;
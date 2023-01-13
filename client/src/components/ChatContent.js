import React from 'react';
import { List } from 'antd';
import { useState, useEffect, useRef } from 'react';
import {socket} from '../socket';

const ChatContent = (props) => {  

  const [messages, setMessages] = useState([]);
  let username = "";
  
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages]);


  socket.on('all_messages', (messages) => {
    console.log('Client recieves all message', messages);
    setMessages(messages);
  });

  socket.on('new_message', (message) => {
    console.log('Client recieves new message', message);
    setMessages([...messages, message]);
  });

  
  socket.on("client_name", (name) => {
    console.log("Client recieves it's name", name);
    socket.name = name;
    username = name;
  });

  return (
    <>
    <List
      dataSource={messages}
      style={{flex: 1, overflow: 'auto'}}
      footer={<div ref={messagesEndRef}></div>}
      bordered = {true}
      renderItem={(item, index) => (
          item.user == socket.name ?
          <List.Item key={item.id} style={{border: 'none'}}>
            <div className='mymessage'>
              {item.message}
            </div>
          </List.Item> : 
          <List.Item key={item.id} style={{border: 'none'}}>
            <div className='othermessage'>
              <b>{item.user}:</b> {item.message}
            </div>
          </List.Item>
          
      )}
    />
    </>
  );
};
export default ChatContent;
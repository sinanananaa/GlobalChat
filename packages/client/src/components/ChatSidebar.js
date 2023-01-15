import React from 'react';
import { List } from 'antd';
import { useEffect } from 'react';
import {socket} from '../socket';
import { useContext } from 'react';
import { ChatContext } from '../provider/ChatProvider';

const ChatSidebar = () => {

  const { chats, setChats, currentChat, setCurrentChat} = useContext(ChatContext);

  // socket.on('active_users', (active_users) => {
  //   console.log('Client recieves list of active users before him', active_users);
  //   let active_chats = active_users.map((user) => { return {name: user, messages: []};})
  //   setChats([...chats, ...active_chats]);
  // });

  // socket.on('new_user', (user) => {
  //   console.log('New user joined', user);
  //   const chat = {
  //     name: user,
  //     messages: []
  //   };
  //   console.log(chat);
  //   setChats([...chats, chat]);
  // });

  // socket.on('remove_user', (remove_user) => {
  //   console.log('User left the chat', remove_user);
  //   setChats(chats => chats.filter(function( chat ) {
  //     return chat.name !== remove_user;
  //   }));
  // });

  return (<List
    dataSource={chats}
    renderItem={(item) => (
      item.name === currentChat.name ?
      <List.Item key={item.name} onClick={() => setCurrentChat(item)} className="list-item" >
        <h4>{item.name}</h4>
      </List.Item>
      :
      <List.Item key={item.name} onClick={() => setCurrentChat(item)} className="list-item" >
        {item.name}
      </List.Item>
    )}
  />)

};
export default ChatSidebar;
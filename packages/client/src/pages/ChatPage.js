import React from 'react';
import ChatSidebar from '../components/ChatSidebar';
import ChatContent from '../components/ChatContent';
import ChatFooter from '../components/ChatFooter';
import ChatHeader from '../components/ChatHeader';
import { Layout } from 'antd';
import {socket} from '../socket';
import { useContext, useEffect } from 'react';
import { ChatContext } from '../provider/ChatProvider';
import { SocketContext } from '../socket';
const { Header,Sider, Content } = Layout;



const ChatPage = () => {

  const socket = useContext(SocketContext);
  const { username, setUsername, currentChat, setCurrentChat, chats, setChats} = useContext(ChatContext);
  
  
      
    socket.once("client_name", (name) => {
      setUsername(name);
      console.log("Client recieves it's name", name);
    });

    socket.once('all_messages', async (messages) => {
      console.log('Client recieves all message', messages);
      let updatedChats = [...chats];
      updatedChats[0].messages = messages;
      await setChats(updatedChats);
  });

  socket.once('active_users', async (active_users) => {
    console.log('Client recieves list of active users before him', active_users);
    let active_chats = active_users.map((user) => { return {name: user, messages: []};})
    await setChats([...chats, ...active_chats]);
    console.log(chats);
  });

    socket.on('recieve_message', (message) => {
      console.log('Client recieves new message', message);
      socket.off('recieve_message');
      if(message.to === "Global") {
        const updatedChats = [...chats];
        updatedChats[0].messages.push(message);
        if(currentChat.name == "Global")
          setCurrentChat(updatedChats[0]);
        setChats(updatedChats);
      } else {
        const updatedChats = [...chats];
        const updatedChatIndex = chats.findIndex(chat => chat.name === message.from);
        console.log(updatedChats);
        console.log(updatedChatIndex); 
        updatedChats[updatedChatIndex].messages.push(message);
        if(currentChat.name === message.from)
        setCurrentChat(updatedChats[updatedChatIndex]);
        setChats(updatedChats);
      }
    });

   

    socket.on('new_user', (user) => {
      console.log('New user joined', user);
      const chat = {
        name: user,
        messages: []
      };
      console.log(chat);
      socket.off('new_user');
      setChats([...chats, chat]);
    });

    socket.on('remove_user', (remove_user) => {
      console.log('User left the chat', remove_user);
      socket.off('remove_user');
      setChats(chats => chats.filter(function( chat ) {
        return chat.name !== remove_user;
      }));
    });



  return (
    <>

    <Header style={{height:'30px'}}>
      <ChatHeader/>
    </Header>
    <Layout className="mainlayout">
     <Sider breakpoint="sm" collapsedWidth="0" style={{background: "white", overflow: 'auto'}}>
        <ChatSidebar/>
      </Sider>
      <Content className='mainpanel'>
        <ChatContent className='chatcontent'/>
        <ChatFooter style={{height: "40px"}}/>
      </Content>
    </Layout>

    </>
  );
};
export default ChatPage;

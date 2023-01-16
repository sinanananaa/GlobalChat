import React, { useContext, useEffect } from 'react';
import ChatSidebar from '../components/ChatSidebar';
import ChatContent from '../components/ChatContent';
import ChatFooter from '../components/ChatFooter';
import ChatHeader from '../components/ChatHeader';
import { Layout } from 'antd';
import { ChatContext } from '../contexts/ChatContext';
import { SocketContext} from '../contexts/SocketContext';
const { Header,Sider, Content } = Layout;

let count = 0;

const ChatPage = () => {

  const { username, setUsername, currentChat, setCurrentChat, chats, setChats, init, setInit } = useContext(ChatContext);
  const socket = useContext(SocketContext);

  useEffect(() => {
    //// GETNAME

    console.log("I am executing", count);
    count++;

    socket.once("client_name", (name) => {
      console.log("Client recieves it's name", name);
      setUsername(name);
    });

    /// GET ALL MESSAGES
    socket.once('active_users', (active_users) => {
      console.log('Client recieves list of active users before him', active_users);
      console.log(chats);
      setChats(chats => [...chats, ...active_users.map((user) => { return {name: user, messages: []};})]);   
      setInit(true);
    });

    return(() => {
      socket.off("client_name");
      socket.off("active_users");
    });
  }, [])


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

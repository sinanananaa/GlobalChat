import React from 'react';
import ChatSidebar from '../components/ChatSidebar';
import ChatContent from '../components/ChatContent';
import ChatFooter from '../components/ChatFooter';
import ChatHeader from '../components/ChatHeader';
import { Layout } from 'antd';

const { Header,Sider, Content } = Layout;

const ChatPage = () => {

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

import React from 'react';
import ChatSidebar from './ChatSidebar';
import ChatContent from './ChatContent';
import ChatFooter from './ChatFooter';
import ChatHeader from './ChatHeader';

import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

const ChatPage = () => {
  return (
    <>
    <Header>
      <ChatHeader/>
    </Header>
    <Layout>
      <Sider breakpoint="lg"
        collapsedWidth="0" style={{background: "white"}}>
        <ChatSidebar />
      </Sider>
      <Layout>
        <Content><ChatContent /></Content>
        <Footer><ChatFooter /></Footer>
      </Layout>
    </Layout>
    </>
  );
};
export default ChatPage;

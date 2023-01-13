import React from 'react';
import ChatSidebar from './ChatSidebar';
import ChatContent from './ChatContent';
import ChatFooter from './ChatFooter';
import ChatHeader from './ChatHeader';

import { Col, Layout, Row } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

const ChatPage = () => {


  return (
    <>

      <Header style={{height:'30px'}}>
        <ChatHeader/>
      </Header>

      <Layout style={{height: `calc(100vh-100px)`, display: 'flex', flexDirection: 'row'}}>

        <Sider breakpoint="sm" collapsedWidth="0" style={{background: "white"}}>
          <ChatSidebar />
        </Sider>
        <Content style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
          <ChatContent style={{display: 'block', flex: 1}} />
          <ChatFooter style={{display: 'block', height: "40px"}}/>
        </Content>

      </Layout>

      <Footer style={{height: "60px"}}>Amina</Footer>

    </>
  );
};
export default ChatPage;

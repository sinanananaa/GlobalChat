import React from 'react';
import ChatSidebar from './components/ChatSidebar';
import ChatContent from './components/ChatContent';
import ChatFooter from './components/ChatFooter';
import ChatHeader from './components/ChatHeader';
import './App.css';

import { Col, Layout, Row } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

//import socketIO from 'socket.io-client';
//const socket = socketIO.connect('http://localhost:8000');

function App() {
  return (
    <>

    <Header style={{height:'30px'}}>
      <ChatHeader/>
    </Header>

    <Layout className="mainlayout">
     <Sider breakpoint="sm" collapsedWidth="0" style={{background: "white"}}>
        <ChatSidebar />
      </Sider>
      <Content className='maincontent'>
        <ChatContent style={{flex: 1}} />
        <ChatFooter style={{height: "40px"}}/>
      </Content>

    </Layout>
  </>
  );
}

export default App;

import React from 'react';
import { List } from 'antd';
import { useContext } from 'react';
import { ChatContext } from '../contexts/ChatContext';

const ChatSidebar = () => {

  const { chats, currentChat, setCurrentChat} = useContext(ChatContext);

  return (<List
    dataSource={chats}
    renderItem={(item) => (
      item.name === currentChat.name ?
      <List.Item key={item.name} onClick={() => { item.newMessages=0; setCurrentChat(item);}} className="list-item" >
        <h4>{item.name} {item.newMessages !== 0 ? "("+item.newMessages+")" : ""} </h4>
      </List.Item>
      :
      <List.Item key={item.name} onClick={() => { item.newMessages=0; setCurrentChat(item);}} className="list-item" >
        {item.name} {item.newMessages !== 0 ? "("+item.newMessages+")" : ""}
      </List.Item>
    )}
  />)

};
export default ChatSidebar;
import React from 'react';
import { List } from 'antd';
import { useContext } from 'react';
import { ChatContext } from '../provider/ChatProvider';

const ChatSidebar = () => {

  const { chats,  currentChat, setCurrentChat} = useContext(ChatContext);

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
import React from 'react';
import { List } from 'antd';

const data = [
  {name: 'GlobalChat'},
  {name: 'User1'},
  {name: 'User2'},
  {name: 'User3'},
  {name: 'User4'}
];
const ChatSidebar = () => {
  return (<List
    dataSource={data}
    renderItem={(item) => (
      <List.Item>
        {item.name}
      </List.Item>
    )}
  />)

};
export default ChatSidebar;
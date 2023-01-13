import React from 'react';
import { List } from 'antd';

const data = [
  {"user": "user123", message: "cao", "id": "123"},
  {"user": "user124", message: "cao i tebi", "id": "124"}
]
const ChatContent = () => {  
  return (
    <>
    <div
      id="scrollableDiv"
      style={{
        height: 400,
        overflow: 'auto',
        padding: '0 16px',
        border: '1px solid rgba(140, 140, 140, 0.35)',
      }}
    >
    <List
      dataSource={data}
      renderItem={(item) => (
          item.user == "user123" ?
          <List.Item key={item.id}>
            <List.Item.Meta
            title={item.user}
            description={item.message}
            /> 
          </List.Item> : 
          <List.Item key={item.id} style={{background:"lightblue"}}>
            <List.Item.Meta
              title={item.user}
              description={item.message}
            /> 
          </List.Item>
      )}
    />
    </div>
    </>
  );
};
export default ChatContent;
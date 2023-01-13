import React from 'react';
import { List } from 'antd';

const data = [
  {"user": "user123", message: "cao", "id": "123"},
  {"user": "user124", message: "cao i tebi", "id": "124"},
  {"user": "user124", message: "cao i tebi1", "id": "125"},
  {"user": "user124", message: "cao i tebi2", "id": "126"},
  {"user": "user123", message: "cao i tebi3", "id": "127"},
  {"user": "user124", message: "cao i tebi4", "id": "128"},
  {"user": "user124", message: "cao i tebi4", "id": "129"},
  {"user": "user124", message: "cao i tebi89", "id": "133"}
]
const ChatContent = () => {  
  return (
    <>
   
    <List
      dataSource={data}
      style={{height:'100%'}}
      bordered = {true}
      renderItem={(item) => (
          item.user == "user123" ?
          <List.Item key={item.id} style={{border: 'none'}}>
            <div className='mymessage'>
              {item.message}
            </div>
          </List.Item> : 
          <List.Item key={item.id} style={{border: 'none'}}>
            <div className='othermessage'>
              <b>{item.user}:</b> {item.message}
            </div>
          </List.Item>
      )}
    />
    </>
  );
};
export default ChatContent;
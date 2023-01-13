import React from 'react';
import { List } from 'antd';
import { useState, useEffect } from 'react';
import {socket} from '../socket';

const ChatSidebar = () => {

  const [users, setUsers] = useState([]);

  const globalChat = { name: "Global"};

  useEffect(() => {
    setUsers([...users, globalChat])
  }, []);

  socket.on('active_users', (active_users) => {
    console.log('Client recieves list of active users before him', active_users);
    setUsers([...users, ...active_users]);
  });


  socket.on('new_user', (user) => {
    console.log('New user joined', user);
    setUsers([...users, {name: user}]);
  });

  socket.on('remove_user', (remove_user) => {
    console.log('User left the chat', remove_user);
    setUsers(users => users.filter(function( user ) {
      return user.name !== remove_user;
    }));
  });

  return (<List
    dataSource={users}
    renderItem={(item) => (
      <List.Item>
        {item.name}
      </List.Item>
    )}
  />)

};
export default ChatSidebar;
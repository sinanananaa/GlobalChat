import React from 'react';
import { List } from 'antd';
import { useEffect, useRef, useContext, useState } from 'react';
import { ChatContext } from '../provider/ChatProvider';
import { SocketContext } from '../socket';

// Importing toastify module
import  { ToastContainer, toast } from 'react-toastify';
 
// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';


const ChatContent = () => {  

  const { username, setUsername, currentChat, setCurrentChat, chats, setChats} = useContext(ChatContext);

  const socket = useContext(SocketContext);

  const [page, setPage] = useState(1);
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const onLoadMore = () => {
    if(currentChat.name === "Global") setPage(page => page + 1);
  }

  useEffect(() => {
    scrollToBottom();
  }, [chats, currentChat]);

  useEffect(() => {
    socket.once('active_users', (active_users) => {
      console.log('Client recieves list of active users before him', active_users);
      setChats([...chats, ...active_users.map((user) => { return {name: user, messages: []};})]);   
    });
  }, []);

  useEffect(() => {
    async function fetchMessages(page) {
      const res = await fetch(`http://localhost:8000/api/chats?page=${page}&limit=10`);
      const data = await res.json();
      const updatedChats = [...chats];
      updatedChats[0].messages.unshift(...data);
      setChats(updatedChats);
      setCurrentChat(updatedChats[0]);
    }
    fetchMessages(page);
  }, [page]);
  
  useEffect(() => {

    socket.once("client_name", (name) => {
      console.log("Client recieves it's name", name);
      setUsername(name);
   });

  //  socket.once('active_users', (active_users) => {
  //   console.log('Client recieves list of active users before him', active_users);
  //   setChats([...chats, ...active_users.map((user) => { return {name: user, messages: []};})]);   
  // });

  socket.on('new_user', (user) => {
    console.log('New user joined', user);
    toast('New user joined ' + user);
    setChats([...chats, {name: user, messages: []}]);
  });

  socket.on('remove_user', (remove_user) => {
    console.log('User left the chat', remove_user);
    let newChats = chats.filter(function( chat ) {
      return chat.name !== remove_user;
    });
    setChats(newChats);
  });

  socket.on('recieve_message', (message) => {
    console.log('Client recieves new message', message);
    if(message.to === "Global") {
      const updatedChats = [...chats];
      updatedChats[0].messages.push(message);
      if(currentChat.name === "Global")
        setCurrentChat(updatedChats[0]);
      setChats(updatedChats);
      toast("There is new message in global chat");
    } else {
      const updatedChats = [...chats];
      const updatedChatIndex = chats.findIndex(chat => chat.name === message.from); 
      updatedChats[updatedChatIndex].messages.push(message);
      if(currentChat.name === message.from)
        setCurrentChat(updatedChats[updatedChatIndex]);
      setChats(updatedChats);
      toast("There is new message from " + message.from);
    }
  });
  
      return () => {
        socket.off('remove_user');
        socket.off('new_user');
        socket.off('recieve_message');
       // socket.off('active_users');
      }
    
  }, [username]);

  return (
    <>
    <ToastContainer autoClose={1000}/>
    <List
      dataSource={currentChat.messages}
      style={{flex: 1, overflow: 'auto'}}
      header={currentChat.name === "Global" ? <button onClick={() => onLoadMore()}>Load more</button> : <div></div>}
      footer={<div ref={messagesEndRef}></div>}
      bordered = {true}
      renderItem={(item) => (
          item.from === username ?
          <List.Item key={item._id} style={{border: 'none'}}>
            <div className='mymessage'>
              {item.message}
            </div>
          </List.Item> : 
          <List.Item key={item._id} style={{border: 'none'}}>
            <div className='othermessage'>
              <b>{item.from}:</b> {item.message}
            </div>
          </List.Item>
          
      )}
    />
    </>
  );
};
export default ChatContent;
import React from 'react';
import { List } from 'antd';
import { useEffect, useRef, useContext, useState } from 'react';
import { ChatContext } from '../contexts/ChatContext';
import 'react-toastify/dist/ReactToastify.css';
import  { ToastContainer } from 'react-toastify';
import { SocketContext } from '../contexts/SocketContext';

const ChatContent = () => {  

  const { username,chats, setChats, currentChat, setCurrentChat, init } = useContext(ChatContext);
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

      console.log("Executing second useEffect");
          /// NEW USER
    socket.on('new_user', (user) => {
      console.log('New user joined', user);
      //toast('New user joined ' + user, { toastId:'amina'});
      const updatedChats = [...chats];
      updatedChats.push({name: user, messages: []});
      setChats(updatedChats);
    });

    /// REMOVE USER
    socket.on('remove_user', (remove_user) => {
        console.log('User left the chat', remove_user);
        let newChats = chats.filter(function( chat ) {
            return chat.name !== remove_user;
        });
        setChats(newChats);
    });

    /// RECIEVE MESSAGE
    socket.on('recieve_message', (message) => {
      console.log('Client recieves new message', message);
      
      if(message.to === "Global") {
        const updatedChats = [...chats];
        updatedChats[0].messages.push(message);
        if(currentChat.name === "Global") {
          console.log("curr", currentChat.name);
          setCurrentChat(updatedChats[0]);
          scrollToBottom();
        }
        setChats(updatedChats);
        //toast("There is new message in global chat");
        //notifyMe(message);
      } else {
        const updatedChats = [...chats];
        console.log(chats);
        const updatedChatIndex = chats.findIndex(chat => chat.name === message.from); 
        updatedChats[updatedChatIndex].messages.push(message);
        if(currentChat.name === message.from) {
          console.log("curr", currentChat);
          console.log("from", message.from);
          setCurrentChat(updatedChats[updatedChatIndex]);
          scrollToBottom();
        }
        setChats(updatedChats);
        //toast("There is new message from " + message.from);
        //notifyMe(message);
      }
    });

    return(() => {
      socket.off("new_user");
      socket.off("remove_user");
      socket.off("recieve_message");
    });
    }, [chats, currentChat])

  useEffect(() => {
    async function fetchMessages(page) {
      const res = await fetch(`http://localhost:8000/api/chats?page=${page}&limit=10`);
      const data = await res.json()
      const updatedChats = [...chats];
      updatedChats[0].messages.unshift(...data);
      setChats(updatedChats);
      setCurrentChat(updatedChats[0]);
    }
    if(init) {
      fetchMessages(page);
    }
  }, [page, init]);

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
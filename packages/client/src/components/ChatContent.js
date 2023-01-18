import React from 'react';
import { List } from 'antd';
import { useEffect, useRef, useContext, useState } from 'react';
import { ChatContext } from '../contexts/ChatContext';
import 'react-toastify/dist/ReactToastify.css';
import  { ToastContainer, toast } from 'react-toastify';
import { SocketContext } from '../contexts/SocketContext';
import '../style/App.css';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

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

    scrollToBottom();
   
    socket.on('new_user', (user) => {
      toast('New user joined.', { toastId:'newUser'});
      setChats(chats => [...chats, {name: user, messages: [], newMessages: 0}]);
    });

    socket.on('remove_user', (remove_user) => {
        setChats(chats => chats.filter(chat => chat.name !== remove_user));
    });

    socket.on('recieve_message', (message) => {      
      if(message.to === "Global") {
        const updatedChats = [...chats];
        updatedChats[0].messages.push(message);
        if(currentChat.name === "Global") {
          setCurrentChat(updatedChats[0]);
        } else {
          updatedChats[0].newMessages++;
          toast("You have new message", { toastId: 'newMessage'});
          //notifyMe(message);
        }
        setChats(updatedChats);
      } else {
        const updatedChats = [...chats];
        const updatedChatIndex = chats.findIndex(chat => chat.name === message.from); 
        updatedChats[updatedChatIndex].messages.push(message);
        if(currentChat.name === message.from) {
          setCurrentChat(updatedChats[updatedChatIndex]);
        } else {
          updatedChats[updatedChatIndex].newMessages++;
          toast("You have new message", { toastId: 'newMessage'});
          //notifyMe(message);
        }
        setChats(updatedChats);
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
      const res = await fetch(`${SERVER_URL}/api/chats?page=${page}&limit=10`);
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
      className="chat-container"
      header={currentChat.name === "Global" ? <button type='dashed' style={{ width: '100%' }} className="load-more-btn" onClick={() => onLoadMore()}>Load more</button> : ""}
      footer={<div ref={messagesEndRef}></div>}
      bordered = {true}
      renderItem={(item) => (
        <List.Item key={item._id} style={{border: 'none'}}>
          <div className={item.from === username ? 'mymessage' : 'othermessage'}>
            {item.from !== username && <div className='username'>{item.from}:</div>}
            <div className='message-text'>{item.message}</div>
          </div>
        </List.Item> 
      )}
    />
    </>
  );
};
export default ChatContent;
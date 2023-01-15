import React from 'react';
import { Button, Form, Input, Space} from 'antd';
import {socket} from '../socket';
import { useContext, useCallback} from 'react';
import { ChatContext } from '../provider/ChatProvider';
import { SocketContext } from '../socket';
const {TextArea} = Input;

const ChatFooter = () => {

  const socket = useContext(SocketContext);

  const { username, setUsername, currentChat, setCurrentChat, chats, setChats} = useContext(ChatContext);

  const [form] = Form.useForm();

  const onSendMessage = (values) => {
    console.log('Client sends new message', values.message);
    let message = {
      from: username,
      to: currentChat.name,
      message: values.message
    }
    socket.emit("send_message", message)
    socket.off();
    console.log('Client sends new message', message);
    const updatedChats = [...chats];
    const currentChatIndex = chats.findIndex(chat => chat.name === currentChat.name);
    updatedChats[currentChatIndex].messages.push(message);
    setCurrentChat(updatedChats[currentChatIndex]);
    setChats(updatedChats);
    //setUsername(username);
    form.resetFields();
  };

  return (

    <Form 
      onFinish={onSendMessage} 
      layout='inline'
      form={form}
    >
      <Space.Compact block size="small">
        <Form.Item name="message"  style={{ width: 'calc(100% - 100px)'}}>
         <TextArea rows={3} placeholder="Write a message"/>
        </Form.Item>
        <Form.Item >
          <Button type="primary" htmlType='submit'>Submit</Button>
        </Form.Item>
      </Space.Compact>
    </Form>

   
  );
};
export default ChatFooter;
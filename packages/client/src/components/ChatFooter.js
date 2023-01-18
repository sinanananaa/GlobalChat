import React from 'react';
import { Button, Form, Input, Space} from 'antd';
import { useContext } from 'react';
import { ChatContext } from '../contexts/ChatContext';
import { SocketContext } from '../contexts/SocketContext';
const {TextArea} = Input;

const ChatFooter = () => {

  const { username, currentChat, setCurrentChat, chats, setChats } = useContext(ChatContext);
  const socket = useContext(SocketContext);
  const [form] = Form.useForm();

  const onSendMessage = (values) => {
    let message = {
      from: username,
      to: currentChat.name,
      message: values.message
    }
    socket.emit("send_message", message)
    const updatedChats = [...chats];
    const currentChatIndex = chats.findIndex(chat => chat.name === currentChat.name);
    updatedChats[currentChatIndex].messages.push(message);
    setCurrentChat(updatedChats[currentChatIndex]);
    setChats(updatedChats);
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
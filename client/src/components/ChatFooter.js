import React, { useState } from 'react';
import { Button, Form, Input, Space} from 'antd';
import {socket} from '../socket';

const {TextArea} = Input;

const ChatFooter = () => {

  const onFinish = (values) => {
    console.log('Client sends new message', values.message);
    socket.emit("new_message", values.message)
    form.resetFields();
  };
  
  const [form] = Form.useForm();

  return (

    <Form 
      onFinish={onFinish} 
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
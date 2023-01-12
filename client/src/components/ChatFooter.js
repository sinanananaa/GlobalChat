import React, { useState } from 'react';
import { Button, Form, Input, Space } from 'antd';
import TextArea from 'antd/es/input/TextArea';

const ChatFooter = () => {
  const [form] = Form.useForm();
  return (

    <Form layout='inline'>
      <Space.Compact block size="small">
        <Form.Item style={{ width: 'calc(100% - 100px)'}}>
         <TextArea rows={3} placeholder="Write a message" form={form}/>
        </Form.Item>
        <Form.Item >
          <Button type="primary">Submit</Button>
        </Form.Item>
      </Space.Compact>
    </Form>

   
  );
};
export default ChatFooter;
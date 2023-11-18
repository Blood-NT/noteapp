

import React from 'react';
import { Form, Input, Button } from 'antd';
import { forgotPassword } from '../../API/userAPI';

function Forgot() {
    const onFinish = async (values) => {
        console.log('Received values of form: ', values);
        const res = await forgotPassword(values.username);
        console.log("res");
    };

    return (
        <Form
            name="forgot_password"
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
            <Form.Item
                label="Email"
                name="email"
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not a valid email address!',
                    },
                    {
                        required: true,
                        message: 'Please input your email!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}

export default Forgot;

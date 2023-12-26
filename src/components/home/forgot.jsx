

import React, { useContext } from 'react';
import { Form, Input, Button } from 'antd';
import { forgotPassword } from '../../API/userAPI';
import { useNavigate } from 'react-router-dom';
import { NotifiContext } from '../notify/notify';
function Forgot() {
    const history = useNavigate();
    const { setErrorCode } = useContext(NotifiContext);
    const onFinish = async (values) => {
        console.log('Received values of form: ', values);
        const res = await forgotPassword(values.username);
        if (res.statusCode === 220) {
            setErrorCode('FORGOT_001');
            history('/login');
        }
        else if (res.statusCode === 201)
            setErrorCode('FORGOT_002');
        else
           console.log("error Forgot",res);

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

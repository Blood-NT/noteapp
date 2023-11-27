import React, { useContext, useEffect, useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { UserContext } from "../../context/userContext";
function LgoinPopup() {
    const { user, setUser } = useContext(UserContext);
    const [form] = Form.useForm();
    useEffect(  () => {
        if (user?.uid) {
            setcheck(true);
        }
    }
    , []);
    const handleLogin = async(username,password,remember) => {
        const res = await login(username, password, remember);
        console.log("loginnnn",res);
        if (res.statusCode===200) {
            const datauser={
                uid:username,
                accessToken:res.accessToken,
                refreshToken:res.refreshToken,
            }
            setUser(datauser);
            setcheck(false);
        }
    }
    const handleOk = () => {
        form
            .validateFields()
            .then((values) => {
                handleLogin(values.username, values.password, values.remember);
            })
            .catch((errorInfo) => {
                console.log('Validation Failed:', errorInfo);
            });
    };
    const [check, setcheck] = useState(false);
    const onCancel = () => {
        setcheck(false)
    };
    return (
        <Modal
            open={check}
            title="Loginnn"
            visible={visible}
            footer={[
                <Button key="back" onClick={onCancel}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handleOk}>
                    Login
                </Button>,
            ]}
        >
            <Form form={form} name="loginForm">
                <Form.Item
                    name="username"
                    label="Username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default LgoinPopup;
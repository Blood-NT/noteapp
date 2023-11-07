
import { useContext, useState } from "react";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { UserContext } from "../../context/userContext";
import { Link } from "react-router-dom";

function Login() {
    const { user, setUser } = useContext(UserContext);

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        console.log("username: ", values.username);
        console.log("password: ", values.password);
        setUser(values);
    };

    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
            <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your Username!' }]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
            >
                <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>
            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Link to="/forgot-password" style={{ textDecoration: "none" }}>
                    <a>forgot password</a>
                </Link>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
                Or<Link to="/forgot-password" style={{ textDecoration: "none" }}>
                 <a > register now!</a>
                </Link>
            </Form.Item>
        </Form>
    );
}

export default Login;


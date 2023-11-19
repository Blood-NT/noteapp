
import { useContext, useEffect, useState } from "react";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { UserContext } from "../../context/userContext";
import { Link } from "react-router-dom";
import { login, loginByToken } from "../../API/userAPI";
function Login () {
    const { user, setUser } = useContext(UserContext);

    useEffect(  () => {
      const fetchData = async () => {
        const res = await loginByToken();
        console.log(res);
        if (res.statusCode==200) {
            const datauser={
                uid:res.data.uid,
                accessToken:res.data.accessToken,
                refreshToken:res.data.token,
            }
            setUser(datauser);
            localStorage.setItem("token", res.data.accessToken);
        }   
    }
      fetchData();
    }, []);
    const onFinish = async (values) => {
        const res = await login(values.username, values.password, values.remember);
        console.log("loginnnn",res);
        if (res.statusCode===200) {
            const datauser={
                uid:values.username,
                accessToken:res.accessToken,
                refreshToken:res.refreshToken,
            }
            setUser(datauser);
        }
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
                Or<Link to="/register" style={{ textDecoration: "none" }}>
                 <a > register now!</a>
                </Link>
            </Form.Item>
        </Form>
    );
}

export default Login;


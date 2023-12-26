
import { useContext, useState } from "react";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { Link } from "react-router-dom";
import { register } from "../../API/userAPI";
import { NotifiContext } from "../notify/notify";
import { useNavigate } from 'react-router-dom';

function Register() {
  const history = useNavigate();

  const { setErrorCode } = useContext(NotifiContext);
  const onFinish = async (values) => {
    const res = await register(values.username, values.password, values.email);
    console.log("register", res);
    if (res.statusCode === 210) {
      setErrorCode("REGISTER_001");
      // chuyển hướng về trang login
      history("/login");
    }
    else if (res.statusCode === 211)
      setErrorCode("REGISTER_002");
    else if (res.statusCode === 212)
      setErrorCode("REGISTER_003");
    else if (res.statusCode === 213)
      setErrorCode("REGISTER_004");
    else
      console.log("error Register", res);


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
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>


      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The new password that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>



      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Register
        </Button>
        <a>Or</a><Link to="/login" style={{ textDecoration: "none" }}>
          <a > login now!</a>
        </Link>
      </Form.Item>
    </Form>
  );
}

export default Register;


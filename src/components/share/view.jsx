import React, { useContext, useEffect, useState } from 'react';
import { getDataNote, getInfoNote } from '../../API/noteAPI';
import { Col, Flex, Row, Input, Checkbox, Button, Form } from 'antd';

import { UserContext } from '../../context/userContext';
import { login, loginByToken } from '../../API/userAPI';
import CardQR from '../form/cardQR';
import { useParams } from 'react-router-dom';


import socketIOClient from 'socket.io-client';



function View() {
    const [content, setContent] = useState('');
    const { user, setUser } = useContext(UserContext);
    const { idshare } = useParams();
    const [infonote, setInfonote] = useState();

    // socket
       const ENDPOINT = "http://localhost:8083";
    const [noteData, setNoteData] = useState();
    const socket = socketIOClient(ENDPOINT);
  
    useEffect(() => {
      socket.on('connect', () => {
        console.log('Kết nối đến server thành công');
      });
      // Lắng nghe sự kiện 'noteUpdated' và cập nhật dữ liệu tương ứng
      socket.emit('joinNoteRoom', idshare);

      socket.on('noteUpdated', (data) => {
        console.log('Note đã được cập nhật:', data);
        setNoteData(data);
      });
  
      return () => {
        socket.disconnect(); // Ngắt kết nối socket khi component unmount
      };
    }, []);

    //
    useEffect(() => {
        // const id = window.location.href
        const fecthData = async () => {
            const res = await getInfoNote(idshare);
            setInfonote(res.data.data);
            if (res.data.data?.share==2) {
                setCheckView(true);
            }
            const res2 = await loginByToken();
            if (res2.statusCode == 200) {
                console.log("caof ddaay");
                const datauser = {
                    uid: res2.data.uid,
                    accessToken: res2.data.accessToken,
                    refreshToken: res2.data.token,
                }
                console.log("done check", datauser)
                setUser(datauser);
                localStorage.setItem("token", res2.data.accessToken);
            }
        }
        fecthData();
        console.log("checkusser", user)
        console.log("id share ne", idshare);
    }, [])

    // cập nhật sau 2s
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         const fetchData = async () => {
    //             const res = await getDataNote(idshare);
    //             setContent(res.data.data?.content);
    //             console.log("check", res);
    //         }
    //         console.log("checkkkkmkm", user);
    //         fetchData();
    //     }, 2000);
    //     return () => clearInterval(interval);
    // }, [])
    const handleLogin = async (values) => {
        const res = await login(values.username, values.password, values.remember);
        console.log("loginnnn", res);
        if (res.statusCode === 200) {
            const datauser = {
                uid: values.username,
                accessToken: res.accessToken,
                refreshToken: res.refreshToken,
            }
            setUser(datauser);
        }
    }
    const handleColorChange = (newColor) => {
        console.log('Màu sắc đã thay đổi thành: ', newColor);
    };

    const [checView, setCheckView] = useState(false);

    return (
        checView === true ? (
                <Row>
                    <Col span={18} style={{ background: infonote?.color }}>
                        <div style={{ marginLeft: "15px" }} dangerouslySetInnerHTML={{ __html: content }} />
                    </Col>
                    <Col span={6}>
                        <Flex vertical>
                            {!user ? (
                                // form đăng nhập
                                <Form
                                    name="loginForm"
                                    onFinish={handleLogin}
                                >
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
                                    <Form.Item name="remember" valuePropName="checked">
                                        <Checkbox>Remember me</Checkbox>
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit">
                                            Login
                                        </Button>
                                    </Form.Item>
                                </Form>) : (
                                user?.uid === infonote?.uid ? <p>m là chủ mà, vào chế độ edit mà coi -_-</p> :
                                    <CardQR  {...infonote} onColorChange={handleColorChange} />
                            )
                            }
                        </Flex>
                    </Col>
                    </Row>
            ) : (
                <h1>looix rooif nha</h1>
            )
       

    );
}

export default View;
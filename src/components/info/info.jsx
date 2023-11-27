import React, { useContext, useState } from 'react';
import { Button, Modal, Input, Form, Drawer, Flex } from 'antd';
import { UserContext } from '../../context/userContext';
import { changePassword } from '../../API/userAPI';

import { UserOutlined } from '@ant-design/icons';


function Info() {
    const [form] = Form.useForm();
     // main
     const [open, setOpen] = useState(false);
     const { user, setUser } = useContext(UserContext);
     const showDrawer = () => {
         setOpen(true);
     };
     const onClose = () => {
         setOpen(false);
     };

    // lohgout
    const [confirmLogout, setConfirmLogout] = useState(false);
    const showModalLogout = () => {
        setConfirmLogout(true);
    };
    const handleOkLogout = async() => {
        console.log('ok');
        // xóa token trong localStorge
        await localStorage.removeItem('token');
        await localStorage.removeItem('refreshToken');
        setConfirmLogout(false);
        setUser(null);
        //chuyển hướng sang trang đăng nhập
        // window.location.href = '/login';
    };

    const handleCancelLogout = () => {
        console.log('cancle');
        setConfirmLogout(false);
    };

    // change pass
    const [changepass, setchangepass] = useState(false);
    const showModalChangepass = () => {
        setchangepass(true);
    };
    const handleOkChangePass = async(values) => {
        const change= await changePassword(user.uid,values.oldPass,values.neuPass);
        console.log(change);

        setchangepass(false);
    };
    return (
        <>
            {/* <Button type="primary" onClick={showDrawer}>
                Open
            </Button> */}
            <Button type="dashed" danger shape="circle" icon={<UserOutlined />} size="large" onClick={showDrawer} style={{marginRight:"10px"}}/>

            <Drawer title={user.uid} placement="right" onClose={onClose} open={open}>
                   <Flex  gap="middle" vertical>
                   <Button type="primary" onClick={showModalChangepass}>
                        đổi mật khẩu
                    </Button>
               
                    <Button type="primary" onClick={showModalLogout}>
                       Đăng xuất
                    </Button>
                   </Flex>
              </Drawer>
            <Modal
                open={confirmLogout}
                title="Xác nhận"
                onOk={handleOkLogout}
                onCancel={handleCancelLogout}
                okText="Đăng xuất"
                cancelText="hủy"
                footer={(_, { OkBtn, CancelBtn }) => (
                    <>
                        <CancelBtn />
                        <OkBtn />
                    </>
                )}
            >
                <p>Bạn có muốn đăng xuất</p>
            </Modal>

            <Modal
                open={changepass}
                title="Thay đổi mật khẩu"
                okText="Đổi mật khẩu"
                cancelText="hủyyy"
                onCancel={() => {
                    form.resetFields();
                    setchangepass(false);
                }}
                onOk={() => {
                    form
                        .validateFields()
                        .then((values) => {
                            form.resetFields();
                            handleOkChangePass(values);
                        })
                        .catch((info) => {
                            console.log('Validate Failed:', info);
                        });
                    // setchangepass(false);
                }}
                footer={(_, { OkBtn, CancelBtn }) => (
                    <>
                        <CancelBtn />
                        <OkBtn />
                    </>
                )}
            >
                <Form
                    form={form}
                    // name="normal_login"
                    // className="login-form"
                    initialValues={{ remember: true }}
                >
                    <Form.Item
                        name="oldPass"
                        label="old password"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập mật khẩu cũ',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="neuPass"
                        label="newpass password"
                        rules={[
                            {
                                required: true,
                                message: '',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value) {
                                        return Promise.reject(new Error('Vui lòng nhập mật khẩu mới!'));
                                    }
                                    if ( getFieldValue('oldPass') === value) {
                                        return Promise.reject(new Error('Mật khẩu mới phải khác mật khẩu cũ!'));
                                    }
                                    return Promise.resolve();

                                },
                            }),
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirmNeuPass"
                        label="Confirm Password"
                        dependencies={['neuPass']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Hãy xác nhận mật khẩu mới!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('neuPass') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Mật khẩu mới không khớp!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default Info;
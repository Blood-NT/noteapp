

import { React, useEffect, useState,useContext } from 'react';
import { DownOutlined } from '@ant-design/icons';
// import type { MenuProps } from 'antd';

import { Avatar, List, Dropdown, Space, Typography,Input } from 'antd';
import Myform from '../form/myform';
import CardQR from '../form/cardQR';
import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import { createNote, getAllNote, getInfoNote } from '../../API/noteAPI';
import { UserContext } from '../../context/userContext';

function Edit() {
    const { Search } = Input;

    const [idnote, setIdNote] = useState();
    const { user, setUser } = useContext(UserContext);
    const items = [
        {
            key: '1',
            label: 'sửa',
        },
        {
            key: '2',
            label: 'xóa',
        },
        {
            key: '3',
            label: 'chia sẻ',
            danger: true,
        },
    ];

    const [data, setData] = useState([]);
    const [reloadd,setReloadd]=useState(false);

    useEffect(() => {
        
        const id = window.location.href
        const fecthData = async () => {
            // const res = await getInfoNote(id);
            // setIdNote(res.data)
            console.log("check id",id);
        }
        fecthData();
    }, [])

    
    useEffect(() => {
        const fetchData = async () => {
            const res = await getAllNote(user?.uid);
            setData(res.data.data);
        }
        fetchData();
    }, [])

    useEffect(() => {
        filterNotes("1");
    }, [data])
    const handleMenuClick = (id, e) => {
        console.log("eee", idnote);
    }
    useEffect(() => {
        const fetchData = async () => {
            const res = await getAllNote(user?.uid);
            setData(res.data.data);
        }
         fetchData();
    }, [reloadd])
 
    const onChangeTab = (key) => {
        console.log(key);
        setidd(key)
        filterNotes(key);
    };
    const [idd, setidd] = useState("3");
    // qr code card
    const [dataFilter, setDataFilter] = useState([]);
    const filterNotes = (key) => {
        if (data) {
            if (key === "1") {
                const data1 = data.filter((item) => {
                    return item.importance == 0;
                });
                setDataFilter(data1);
            } else if (key === "2") {
                const data2 = data.filter((item) => {
                    return item.importance == 1;
                });
                setDataFilter(data2);
            } else {
                setDataFilter(data);
            }
        }
    }

    const onSearch = (value) => {
        createNote(value, user.username);
        setReloadd(!reloadd);
    }
    const handleColorChange = (newColor) => {
        console.log('Màu sắc đã thay đổi thành: ', newColor);
       setReloadd(!reloadd);
      };
      const handleChangetitle = (newTitle) => {
        alert('Tiêu đề đã thay đổi thành: ', newTitle)
       setReloadd(!reloadd);
      };
    return (
        < div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ minWidth: "30%", maxWidth: "30%" }}>
                <Tabs
                    defaultActiveKey="1"
                    onChange={onChangeTab}
                    items={[AppleOutlined, AndroidOutlined].map((Icon, i) => {
                        const id = String(i + 1);

                        return {
                            label: (
                                <span>
                                    <Icon />
                                    {id}
                                </span>
                            ),
                            key: id,
                        };
                    })}
                />
                <Search
                    placeholder="nhập tên note bạn muốn thêm"
                    allowClear
                    enterButton="thêm mớiiii"
                    size="large"
                    onSearch={onSearch}
                />
                <List
                    style={{ width: "100%" }}
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: (page) => {
                            console.log(page);
                        },
                        pageSize: 5,
                    }}
                    // locale={{emptyText:'Không có ghi chú nào'}}
                    dataSource={dataFilter}
                    renderItem={(item) => (
                        <List.Item
                            key={item.title}
                            onClick={() => setIdNote(item)}
                            style={{ background: item.color }}

                        >
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <div style={{ width: "90%" }}>
                                    <List.Item.Meta style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
                                        avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${item.id}`} />}
                                        title={item.title}
                                        description={`Create: ${item.created} -- update: ${item.update}`}

                                    />
                                </div>
                                <Dropdown
                                    menu={{
                                        items,
                                        selectable: true,
                                        onClick: (e) => handleMenuClick(item.id, e),
                                        defaultSelectedKeys: ['3'],
                                    }}
                                >
                                    <Typography.Link>
                                        <Space>
                                            <DownOutlined />
                                        </Space>
                                    </Typography.Link>
                                </Dropdown>
                            </div>
                            <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                {item.note}
                            </div>
                        </List.Item>
                    )}
                />
            </div>
            {idnote && <Myform {...idnote} onTitleChange={handleChangetitle} style={{ width: "70vw" }} />}

            {/* <CardQR  {...idnote} /> */}
           {idnote &&  <CardQR  {...idnote} onColorChange={handleColorChange} />}

          
        </div>
    );
}

export default Edit;


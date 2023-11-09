

import { React, useEffect, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
// import type { MenuProps } from 'antd';

import { Avatar, List, Dropdown, Space, Typography,Input } from 'antd';
import Myform from '../form/myform';
import CardQR from '../form/cardQR';
import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import { createNote, getAllNote } from '../../API/noteAPI';

function Home() {
    const { Search } = Input;
    
    const [idnote, setIdNote] = useState();

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
        const fetchData = async () => {
            const res = await getAllNote("admin")
            console.log("data",res.data.data);
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
            const res = await getAllNote("admin");
            console.log("data reload",res.data.data);
            setData(res.data.data);
        }
         fetchData();
    }, [reloadd])
    // const data = [{
    //     id: 1,
    //     title: "title1",
    //     note: `note1jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
    //     jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
    //     jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjote1jjjjjjjjjjjjjjjjj
    //     jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
    //     jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
    //     jjjjjjjjjjjjjjjjjjote1jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
    //     \jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
    //     jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjote1jjjjjjjjj
    //     jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
    //     jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
    //     jjjjjjjjjjjjjjjjjjjjjjjjote1jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
    //     jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
    //     jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjote1jjjjjjjjjj
    //     jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
    //     jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
    //     jjjjjjjjjjjjjjjjjote1jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
    //     jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
    //     jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjote1jjjjjjjjjjjjjjjjjjjjjjjjj
    //     jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
    //     jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjo
    //     te1jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
    //     jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj`,

    //     time: "time1",
    //     color: "aqua",
    //     update: "update time", update: "update time",
    // },
    // {
    //     id: 2,
    //     title: "title2",
    //     note: "note2",
    //     time: "time2",
    //     color: "green",
    //     update: "update time",
    // },
    // {
    //     id: 3,
    //     title: "title3",
    //     note: "note3",
    //     time: "time3",
    //     color: "yellow",
    //     update: "update time",
    // },
    // {
    //     id: 4,
    //     title: "title4",
    //     note: "note4",
    //     time: "time4",
    //     color: "red",
    //     update: "update time",
    // },
    // {
    //     id: 5,
    //     title: "title5",
    //     note: "note5",
    //     time: "time5",
    //     color: "pink",
    //     update: "update time",
    // },
    // {
    //     id: 6,
    //     title: "title6",
    //     note: "note6",
    //     time: "time6",
    //     color: "aqua",
    //     update: "update time",
    // },
    // {
    //     id: 7,
    //     title: "title7",
    //     note: "note7",
    //     time: "time7",
    //     color: "aqua",
    //     update: "update time",
    // },
    // {
    //     id: 8,
    //     title: "title8",
    //     note: "note8",
    //     time: "time8",
    //     color: "aqua",
    //     update: "update time",
    // },
    // {
    //     id: 9,
    //     title: "title9",
    //     note: "note9",
    //     time: "time9",
    //     color: "aqua",
    //     update: "update time",
    // },
    // {
    //     id: 10,
    //     title: "title10",
    //     note: "note10",
    //     time: "time10",
    //     color: "aqua",
    //     update: "update time",
    // },
    // {
    //     id: 11,
    //     title: "title11",
    //     note: "note11",
    //     time: "time11",
    //     color: "aqua",
    //     update: "update time",
    // },
    // {
    //     id: 12,
    //     title: "title12",
    //     note: "note12",
    //     time: "time12",
    //     color: "aqua",
    //     update: "update time",
    // },
    // {
    //     id: 13,
    //     title: "title13",
    //     note: "note13",
    //     time: "time13",
    //     color: "aqua",
    //     update: "update time",
    // },
    // {
    //     id: 14,
    //     title: "title14",
    //     note: "note14",
    //     time: "time14",
    //     color: "aqua",
    //     update: "update time",
    // },
    // {
    //     id: 15,
    //     title: "title15",
    //     note: "note15",
    //     time: "time15",
    //     color: "aqua",
    //     update: "update time",
    // },
    // {
    //     id: 16,
    //     title: "title16",
    //     note: "note16",
    //     time: "time16",
    //     color: "aqua",
    //     update: "update time",
    // },
    // {
    //     id: 17,
    //     title: "title17",
    //     note: "note17",
    //     time: "time17",
    //     color: "aqua",
    //     update: "update time",
    // },
    // {
    //     id: 18,
    //     title: "title18",
    //     note: "note18",
    //     update: "update time",

    // }
    // ]

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
        createNote(value);
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
                    enterButton="thêm mới"
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

export default Home;


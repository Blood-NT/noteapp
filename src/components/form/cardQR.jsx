import React, { useContext, useEffect, useState } from 'react';
import { Card, Modal, Select, Skeleton, Switch, Space, QRCode, Flex, Button, ColorPicker, Checkbox } from 'antd';
import { DeleteFilled, HeartFilled, HeartOutlined, CopyFilled } from '@ant-design/icons';
import { copyNote, customShare, deleteNote, getInfoNote, getSaveNote, saveNote, setColor, setImportant } from '../../API/noteAPI';
import { UserContext } from '../../context/userContext';

const CardQR = ({ onColorChange, ...props }) => {
    const { user, setUser } = useContext(UserContext);
    const [reload, setReload] = useState("");
    const { Meta } = Card;
    const [currentColor, setCurrentColor] = useState(props.color); // Thay đổi màu hiện tại tại đây
    const [contrastColor, setContrastColor] = useState(invertColor(props.color));
    const [loading, setLoading] = useState(true);
    const checked = false;
    const { Option } = Select;
    const [type, setType] = useState('close');
    const [in4Note, setIn4Note] = useState();
    const [follow, setFollow] = useState(false);

    const [url, setUrl] = useState(window.location.href);
    console.log("url",window.location.href);
    useEffect(() => {
        const fetchData = async () => {
            if (window.location.href.includes("view")) {
                const res = await getInfoNote(props.nid);
                console.log("user qr", res);
                setIn4Note(res.data.data);
                const res2 = await getSaveNote(user.uid, res.data.data.nid);
                console.log("user qr2", res2.data);
                if (res2.data.statusCode==404) {
                    setFollow(true);
                }else{
                    setFollow(false);
                }
            }
        }
        fetchData();
    }, [])

    useEffect(() => {
        setlink("https://snolan.tech/view/" + props.nid);
        setCurrentColor(props.color)
        setContrastColor(invertColor(props.color))
        console.log("check proppp", props);
        const fetchData = async () => {
            const res = await getInfoNote(props.nid);
            setIn4Note(res.data.data);

        }
        fetchData();

    }, [props.nid, props.color]);
    const setcolortoDB = async (color) => {
        onColorChange(color);
        const res = await setColor(props.nid, color);
        console.log("ressss", res);
        setCurrentColor(color)
        setContrastColor(invertColor(color))
    }
    function invertColor(hex) {
        hex = hex.replace('#', '');
        let r = parseInt(hex.substring(0, 2), 16);
        let g = parseInt(hex.substring(2, 4), 16);
        let b = parseInt(hex.substring(4, 6), 16);
        r = (255 - r).toString(16);
        g = (255 - g).toString(16);
        b = (255 - b).toString(16);
        if (r.length == 1)
            r = "0" + r;
        if (g.length == 1)
            g = "0" + g;
        if (b.length == 1)
            b = "0" + b;
        return "#" + r + g + b;
    }
    const [link, setlink] = useState("https://snolan.tech/view/");
    const logo = "https://firebasestorage.googleapis.com/v0/b/nolanwork-128ad.appspot.com/o/image%2Fthuytrang%2Fnolan.png?alt=media&token=cb17e559-b3f9-4b34-86a7-ac1d1861df95&_gl=1*it3so1*_ga*MTE0OTU1Njk1Ny4xNjk5MjU5NTg2*_ga_CW55HF8NVT*MTY5OTI2NTc4Ni4yLjEuMTY5OTI2NTc5Mi41NC4wLjA."
    const colorPick = (color) => {
        setcolortoDB(color.toHexString())
    }
    const onChangeCheckbox = async (e) => {
        const res = await setImportant(props.nid, user.uid)
        onColorChange("black")
        const res2 = await getInfoNote(props.nid);
        setIn4Note(res2.data.data);

    };
    const handleDelete = async () => {
        const res = await deleteNote(props.nid)
        onColorChange("black", res)
    }
    const handleCopy = async () => {
        const res = await copyNote(props.nid, user?.uid)
        console.log("copy", res);
    }
    // check share
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setLoading(type=="close"?true:false)
        setIsModalOpen(true);
    };
    const handleOk = async() => {
        setIsModalOpen(false);
        const res = await customShare(props.nid, user.uid, type==="view"?1:(type==="edit"?2:0))
        console.log("done share", res);

        setLoading(true)
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setLoading(true)

    };


    const onChangeShare = (value) => {
        setType(value);
        setLoading(value=="close"?true:false)
        if (value === "view") {
            setlink("https://snolan.tech/view/" + props.nid);
        }
        else {
            setlink("https://snolan.tech/edit/" + props.nid);
        }
    };

    const handleFollow = async () => {

        const res = await saveNote(props.uid,user.uid,props.nid)
        console.log("check save note",res);
        setFollow(!follow);


    }

    return (
        <div>

            <div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <p>Ngày tạo</p>
                    <p>{props.time}</p>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <p>Cập nhật lần cuối</p>
                    <p>{props.update}</p>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <p>Người tạo</p>
                    <p>hehe</p>
                </div>
                <Flex gap="small" vertical>
                    <Flex wrap="wrap" gap="small">
                        {
                            user.uid === props.uid ?
                                (
                                    <>
                                        <Button type="dashed" icon={<CopyFilled />} onClick={handleCopy}>
                                            sao chép
                                        </Button>
                                        <Checkbox onChange={onChangeCheckbox} checked={in4Note?.importance} >Quan trọng</Checkbox>
                                        <Button type="dashed" icon={<DeleteFilled />} danger onClick={handleDelete}>
                                            xóa
                                        </Button>
                                        <Button type="primary" onClick={showModal}>
                                            Open Modal
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button type="primary" onClick={handleFollow} icon={follow ? <HeartOutlined /> : <HeartFilled />}>
                                            {follow ? "theo dõi" : "bỏ theo dõi"}
                                        </Button>
                                        <Button type="dashed" icon={<CopyFilled />} onClick={handleCopy}>
                                            sao chép
                                        </Button>
                                    </>
                                )
                        }
                    </Flex>
                    <ColorPicker size="large"
                        showText
                        defaultValue={currentColor}
                        presets={[
                            {
                                label: 'Recommended',
                                colors: [
                                    '#000000',
                                    '#000000E0',
                                    '#000000A6',
                                    '#00000073',
                                    '#00000040',
                                    '#00000026',
                                    '#0000001A',
                                    '#00000012',
                                    '#0000000A',
                                    '#00000005',
                                    '#F5222D',
                                    '#FA8C16',
                                    '#FADB14',
                                    '#8BBB11',
                                    '#52C41A',
                                    '#13A8A8',
                                    '#1677FF',
                                    '#2F54EB',
                                    '#722ED1',
                                    '#EB2F96',
                                    '#F5222D4D',
                                    '#FA8C164D',
                                    '#FADB144D',
                                    '#8BBB114D',
                                    '#52C41A4D',
                                    '#13A8A84D',
                                    '#1677FF4D',
                                    '#2F54EB4D',
                                    '#722ED14D',
                                    '#EB2F964D',
                                ],
                            },
                            {
                                label: 'Recent',
                                colors: [],
                            },
                        ]}
                        onChangeComplete={(color) => {
                            colorPick(color);
                        }} />
                </Flex>
            </div>
            <>

                <Modal title={`Chia sẽ   ---   "${props.title}"`} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

                    <Flex vertical>
                        <Select value={type} onChange={onChangeShare}>
                            <Option value="view">Chỉ xem (không thể chỉnh sửa)</Option>
                            <Option value="edit">Cho phép chỉnh sửa</Option>
                            <Option value="close">Tắt chia sẽ</Option>
                        </Select>

                        <Card
                            hoverable
                            style={{ width: 400 }}
                            cover={
                                <Skeleton loading={loading} avatar active>
                                    <Space>
                                        <QRCode
                                            value={link}
                                            size={300}
                                            color={"pink"}
                                            // icon="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                                            errorLevel="H"
                                            bgColor={"black"}
                                        />
                                    </Space>
                                    <Meta title={props.id} description={link} />
                                </Skeleton>
                            }
                        ></Card>

                    </Flex>
                </Modal>
            </>

        </div>
    );
}
export default CardQR;

import React, { useEffect, useState } from 'react';
import { Card, Skeleton, Switch, Space, QRCode, Flex, Button, ColorPicker,Checkbox } from 'antd';
import { SearchOutlined, DeleteFilled, HeartFilled, HeartOutlined, CopyFilled } from '@ant-design/icons';

function CardQR(props) {
    const { Meta } = Card;

    const [loading, setLoading] = useState(true);
    const checked = false;
    const onChange = (checked) => {
        setLoading(!checked);
    };
    useEffect(() => {
        setlink("https://snolan.tech/" + props.id);
    }, [props.id]);

    function getContrastColor(hexColor) {
        // Chuyển đổi mã hex sang giá trị RGB
        const r = parseInt(hexColor.slice(1, 3), 16);
        const g = parseInt(hexColor.slice(3, 5), 16);
        const b = parseInt(hexColor.slice(5, 7), 16);

        // Tính độ sáng trung bình
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;

        // Nếu độ sáng trung bình lớn hơn một ngưỡng, sử dụng màu đen; ngược lại, sử dụng màu trắng
        return brightness > 128 ? "#000000" : "#ffffff";
    }

    const currentColor = "#517ACD"; // Thay đổi màu hiện tại tại đây
    const contrastColor = getContrastColor(currentColor);
    const [link, setlink] = useState("https://snolan.tech/");
    const logo = "https://firebasestorage.googleapis.com/v0/b/nolanwork-128ad.appspot.com/o/image%2Fthuytrang%2Fnolan.png?alt=media&token=cb17e559-b3f9-4b34-86a7-ac1d1861df95&_gl=1*it3so1*_ga*MTE0OTU1Njk1Ny4xNjk5MjU5NTg2*_ga_CW55HF8NVT*MTY5OTI2NTc4Ni4yLjEuMTY5OTI2NTc5Mi41NC4wLjA."
    const colorPick = (color) => {
        console.log(color);
    }
    const onChangeCheckbox = (e) => {
        console.log(`checked = ${e.target.checked}`);
      };
    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", textAlign: "center" }}>
                <Switch checked={!loading} onChange={onChange} />
                <p style={{ marginLeft: "8px" }}>Text beside the button</p>
            </div>

            <Card
                hoverable
                style={{ width: 400 }}
                cover={
                    <Skeleton loading={loading} avatar active>
                        <Space>
                            <QRCode
                                value={link}
                                size={300}
                                color={currentColor}
                                icon="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                                errorLevel="H"
                                bgColor={contrastColor}
                            />
                        </Space>
                        <Meta title={props.id} description={link} />
                    </Skeleton>
                }
            ></Card>

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

                        <Button type="primary" icon={checked ? <HeartOutlined /> : <HeartFilled />}>
                            {checked ? "theo dõi" : "bỏ theo dõi"}
                        </Button>


                        <Button type="dashed" icon={<CopyFilled />}>
                            sao chép
                        </Button>
                        <Button type="dashed" icon={<DeleteFilled />} danger>
                            xóa
                        </Button>
                        <ColorPicker size="large"
                            showText 
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
                                console.log("check color: ", color.toHexString());
                            }} />
                    </Flex>
                    <Checkbox onChange={onChangeCheckbox}>Quan trọng</Checkbox>
                </Flex>
            </div>

        </div>
    );
}

export default CardQR;
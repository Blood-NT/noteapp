import React, { useEffect, useState } from 'react';
import { Card, Skeleton, Switch, Space, QRCode, Flex, Button, ColorPicker, Checkbox } from 'antd';
import { SearchOutlined, DeleteFilled, HeartFilled, HeartOutlined, CopyFilled } from '@ant-design/icons';
import { setColor } from '../../API/noteAPI';

const CardQR = ({ onColorChange, ...props }) => {

    const [reload, setReload] = useState("");

    const { Meta } = Card;

    const [loading, setLoading] = useState(true);
    const checked = false;
    const onChange = (checked) => {
        setLoading(!checked);
    };
    useEffect(() => {
        setlink("https://snolan.tech/" + props.nid);
        
        setCurrentColor(props.color)
        setContrastColor(invertColor(props.color))
    }, [props.nid,props.color]);

    const [currentColor,setCurrentColor] = useState(props.color); // Thay đổi màu hiện tại tại đây
    const [contrastColor,setContrastColor] = useState(invertColor(props.color));


    const setcolortoDB= async(color) =>{    
        onColorChange(color);
        const res = await setColor(props.nid, color);
        console.log("ressss", res);
        setCurrentColor(color)
        setContrastColor(invertColor(color))
    }
    function invertColor(hex) {
        // Remove the hash from the color if it's there
        hex = hex.replace('#', '');
      
        // Convert the hex color to RGB
        let r = parseInt(hex.substring(0, 2), 16);
        let g = parseInt(hex.substring(2, 4), 16);
        let b = parseInt(hex.substring(4, 6), 16);
      
        // Invert the colors
        r = (255 - r).toString(16);
        g = (255 - g).toString(16);
        b = (255 - b).toString(16);
      
        // Ensure 2 digits by color
        if (r.length == 1)
          r = "0" + r;
        if (g.length == 1)
          g = "0" + g;
        if (b.length == 1)
          b = "0" + b;
      
        // Return the inverted color
        return "#" + r + g + b;
      }

    const [link, setlink] = useState("https://snolan.tech/");
    const logo = "https://firebasestorage.googleapis.com/v0/b/nolanwork-128ad.appspot.com/o/image%2Fthuytrang%2Fnolan.png?alt=media&token=cb17e559-b3f9-4b34-86a7-ac1d1861df95&_gl=1*it3so1*_ga*MTE0OTU1Njk1Ny4xNjk5MjU5NTg2*_ga_CW55HF8NVT*MTY5OTI2NTc4Ni4yLjEuMTY5OTI2NTc5Mi41NC4wLjA."
    const colorPick = (color) => {
        console.log("check color:kkk ", color.toHexString());

       
        setcolortoDB(color.toHexString())
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
                                // icon="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
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
                    <Checkbox onChange={onChangeCheckbox}>Quan trọng</Checkbox>
                </Flex>
            </div>

        </div>
    );
}

export default CardQR;
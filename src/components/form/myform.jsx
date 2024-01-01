import { useCallback, useContext, useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { uploadImage } from "../../config/upload";
import { Input, Flex, Button } from "antd";
import { getDataNote, updateNote, updateTitleNote } from "../../API/noteAPI";
import { UserContext } from "../../context/userContext";

// import socketIOClient from 'socket.io-client';


export default function Myform({ onTitleChange, ...props }) {
    //   const [value, setValue] = useState(markdownToHtml(props.value || ""));
    const [value, setValue] = useState("");
    const reactQuillRef = useRef(null);
    const { Search } = Input;
    // const ENDPOINT = "http://localhost:8083";
    // const [noteData, setNoteData] = useState();
    // const socket = socketIOClient(ENDPOINT);
    const{user}=useContext(UserContext);
    const [lastValue, setLastValue] = useState("");
    // gửi api sau cập nhật note
    useEffect(() => {
        const logValue = async() => {
            if(value!=lastValue)
           {
            console.log("value", value);
            console.log("lastvalue", lastValue);
             const res = await updateNote(props.nid, props.uid, value)
            setLastValue(value);
        }
        };
        const interval = setInterval(logValue, 1000);

        return () => {
            clearInterval(interval);
        };
        // logValue();
    }, [value]);

    // useEffect(() => {
    //     socket.on('connect', () => {
    //         console.log('Kết nối đến server thành công');
    //     });
    //     socket.emit('joinNoteRoom', props.nid);
    //     return () => {
    //         socket.disconnect(); 
    //     };
    // }, []);

    // Hàm để phát sự kiện 'updateNote' khi muốn cập nhật note
   

    const onSearch = async (check) => {
        // onTitleChange(check);
        const res = await updateNote(props.nid, props.uid, value)
        console.log("update nef", res);
    }

    useEffect(() => {
        const fetchData = async () => {
            const res = await getDataNote(props.nid);
            if (res.data.data && res.data.data.content) {
                setValue(res.data.data.content);
            }
        }
        fetchData();
        setValue("check" + props.nid);
        // tự động lấy dữ liệu từ props.value
    }, [props.nid]);


    const onChange = (content) => {
        setValue(content);
        console.log("change");
        //
    };
    const [save, setSave] = useState(false);

    const imageHandler = useCallback(() => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();
        input.onchange = async () => {
            if (input !== null && input.files !== null) {
                const file = input.files[0];
                const url = await uploadImage(file);
                const quill = reactQuillRef.current;
                if (quill) {
                    const range = quill.getEditorSelection();
                    range && quill.getEditor().insertEmbed(range.index, "image", url);
                    setSave(true);
                }
            }
        };
    }, []);
    const [titleNote, setTitleNote] = useState("");

    const handleonTitleChange = async (e) => {
        if (e.target.value.length > 0) {
            const res = await updateTitleNote(props.nid, props.uid, e.target.value);
            setTitleNote(e.target.value);
            console.log("update title", res);
            onTitleChange(e.target.value)
        }
    }
    return (
        <Flex gap="middle" vertical>
            <Flex>

                <Input placeholder={props.title} onChange={handleonTitleChange} />
                <Button type="primary" onClick={onSearch}>Lưu</Button>
            </Flex>


            <ReactQuill
                ref={reactQuillRef}
                theme="snow"
                placeholder="Start writing..."
                modules={{
                    toolbar: {
                        container: [
                            [{ header: "1" }, { header: "2" }, { font: [] }],
                            [{ size: [] }],
                            ["bold", "italic", "underline", "strike", "blockquote"],
                            [
                                { list: "ordered" },
                                { list: "bullet" },
                                { indent: "-1" },
                                { indent: "+1" },
                            ],
                            ["link", "image", "video"],
                            ["code-block"],
                            ["clean"],
                        ],
                        handlers: {
                            image: imageHandler,
                        },
                    },
                    clipboard: {
                        matchVisual: false,
                    },
                }}
                formats={[
                    "header",
                    "font",
                    "size",
                    "bold",
                    "italic",
                    "underline",
                    "strike",
                    "blockquote",
                    "list",
                    "bullet",
                    "indent",
                    "link",
                    "image",
                    "video",
                    "code-block",
                ]}
                value={value}
                onChange={onChange}
            />
        </Flex>
    );
}

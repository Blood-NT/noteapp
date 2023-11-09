import { useCallback, useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { uploadImage } from "../../config/upload";
import { Input,Flex } from "antd";
import { getDataNote, updateNote, updateTitleNote } from "../../API/noteAPI";
// import { htmlToMarkdown, markdownToHtml } from "./Parser";
// import uploadToCloudinary from "./upload";


export default function Myform({onTitleChange,...props}) {
    //   const [value, setValue] = useState(markdownToHtml(props.value || ""));
    const [value, setValue] = useState("");
    const reactQuillRef = useRef(null);
    const { Search } = Input;


    // gửi api sau 2s
    // useEffect(() => {
    //     const logValue = () => {
    //       console.log("Current value: ", value);
    //     };
    
    //     const interval = setInterval(logValue, 2000);
    
    //     return () => {
    //       clearInterval(interval);
    //     };
    //   }, [value]);
  
    const onSearch = async(check) => {
        onTitleChange(check);
        // await updateTitleNote(props.nid, value); done
        // làm tạm cái lưu ở đây :V

        console.log(`nid:${props.nid} uid:${props.uid}`);
        const res= await updateNote(props.nid,props.uid,value)
        console.log("update nef",res.data);
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
    },[props.nid]);
    

    const onChange = (content) => {
        setValue(content);
        // if (props.onChange) {
        //     props.onChange({
        //         html: content,
        //         // markdown: htmlToMarkdown(content),
        //     });
        // }
        // console.log("content: ", content);
        // console.log(props);
    };


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
                }
            }
        };
    }, []);

    return (
        <Flex gap="middle" vertical>
         <Search
                    placeholder={props.title}
                    // defaultValue={props.title}
                    allowClear
                    enterButton="edit title"
                    size="large"
                    onSearch={onSearch}
                />

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

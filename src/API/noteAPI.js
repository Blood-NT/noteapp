import axios from 'axios';

const createNote = async(note) => {
    const body={
        title:note,
        uid:"admin"
    }
    return await axios.post('http://localhost:8080/note/create', body);
    }
const getAllNote = async(id) => {
    const body={
        uid:id
    }
    return await axios.post('http://localhost:8080/note/getAll', body);
}

const getDataNote = async(nid) => {
    const body={
        nid:nid
    }
    return await axios.post('http://localhost:8080/content/get', body);

}
const updateNote = async(nid,uid, content) => {
    const body={
        uid:uid,
        nid:nid,
        content:content
    }
    const res= await axios.post('http://localhost:8080/content/create', body);
    return res.data

}
const setColor = async(nid, color) => {
    const body={
        nid:nid,
        color:color
    }
    return await axios.post('http://localhost:8080/note/setColor', body);
}
const updateTitleNote = async(nid, title) => {
    const body={
        nid:nid,
        title:title
    }
    const res= await axios.post('http://localhost:8080/note/updateTitle', body);
    return res.data

}




export {

    createNote,
    getAllNote,
    getDataNote,
    updateNote,
    setColor, updateTitleNote
}
import axios from 'axios';


const createNote = async(note,uid) => {
    const body={
        title:note,
        uid:uid,
    }
    return await axios.post('http://localhost:8083/note/create', body);
    }
const getAllNote = async(id) => {
    const body={
        uid:id
    }
    return await axios.post('http://localhost:8083/note/getAll', body);
}

const getDataNote = async(nid) => {
    const body={
        nid:nid
    }
    return await axios.post('http://localhost:8083/content/get', body);

}
const updateNote = async(nid,uid, content) => {
    const body={
        uid:uid,
        nid:nid,
        content:content
    }
    const res= await axios.post('http://localhost:8083/content/create', body);
    return res.data

}
const setColor = async(nid, color) => {
    const body={
        nid:nid,
        color:color
    }
    return await axios.post('http://localhost:8083/note/setColor', body);
}
const updateTitleNote = async(nid, uid, title) => {
    const body={
        nid:nid,
        uid:uid,
        title:title
    }
    const res= await axios.post('http://localhost:8083/note/updateTitle', body);
    return res.data

}


const setImportant = async(nid, uid) => {
    const body={
        nid:nid,
        uid:uid,

        }
    return await axios.post('http://localhost:8083/note/setImportance', body);
}
const getInfoNote = async(nid) => {
    const body={
        nid:nid
    }
    return await axios.post('http://localhost:8083/note/getInfo', body);
}

const deleteNote = async(nid) => {
    const body={
        nid:nid
    }
    return await axios.post('http://localhost:8083/note/delete', body);
}
const copyNote = async(nid, uid) => {
    const body={
        nid:nid,
        uid:uid
    }
    return await axios.post('http://localhost:8083/note/copy', body);
}

const saveNote = async(hid,gid,nid) => {
    const body={
        hid:hid,
        gid:gid,
        nid:nid
    }
    return await axios.post('http://localhost:8083/note/save', body);
}
const getSaveNote = async(gid,nid) => {
    const body={
        gid:gid,
        nid:nid
    }
    return await axios.post('http://localhost:8083/note/getdatasave', body);
}

const customShare = async(nid,uid) => {
    const body={
        nid:nid,
        uid:uid,
    }
    return await axios.post('http://localhost:8083/note/openshare', body);
}
export {

    createNote,
    getAllNote,
    getDataNote,
    updateNote,
    setColor, 
    updateTitleNote,
    setImportant,
    getInfoNote,
    deleteNote,
    copyNote,
    saveNote,
    getSaveNote,
    customShare

}
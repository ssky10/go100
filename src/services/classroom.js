import axios from "axios";

const URL = "https://golony.dev/api/";

export const deleteClass = (token, class_id) => {
    return axios.post(URL+"classroom/deleteclass", {
        Origin: window.location.hostname,
        user_token: token,
        class_id: class_id
    });
}

export const applyStudent = (class_id, user_id, user_token) => {
    return axios.post(URL+"classroom/apply",{
        Origin: window.location.hostname,
        class_id: class_id,
        user_id: user_id,
        user_token: user_token
    });
}

export const deleteStudent = (class_id, user_id, user_token) => {
    return axios.post(URL+"classroom/deletestudent",{
        Origin: window.location.hostname,
        class_id: class_id,
        user_id: user_id,
        user_token: user_token
    })
}

export const getStudentList = (class_id, user_token) => {
    return axios.post(URL+"classroom/getstudentlist",{
        Origin: window.location.hostname,
        class_id: class_id,
        user_token: user_token,
    })
}

export const modifyClassAbout = (token, classIdx, about) => {
    return axios.post(URL+"classroom/setdescription",{
        Origin: window.location.hostname,
        user_token: token,
        class_id: classIdx,
        about: about
    })
}

export const getClassInfo = (token, classIdx) =>{
    return axios.post(URL+"classroom/getclassinfo",{
        Origin: window.location.hostname,
        user_token: token,
        class_id: classIdx
    })
}
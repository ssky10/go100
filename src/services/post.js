import axios from "axios";

const DummyURL ="http://203.255.3.223";

const URL = "https://golony.dev/api/";

export const setNoticePost = (token, classIdx, contents, title) => 
{
  axios.post(URL+"classroom/writenotice",{
    Origin: window.location.hostname,
    user_token: token,
    class_id:classIdx,
    content: contents,
    title: title
  })
}

export const getNoticePostList = (token, classIdx, boardIdx) => {
  return axios.post(URL+"classroom/allnotice",{
    Origin: window.location.hostname,
    user_token: token,
    class: classIdx,
    board_type: boardIdx
  });
}

export const setQnAPostList = (token, class_id) => {
  return axios.post(DummyURL+"setQnAPostList.php",{
    Origin: window.location.hostname,
    user_token: token,
    class_id: class_id
  });
}

export const getWorkPostList = ( token, classIdx, boardIdx) => {
  return axios.post(URL+"classroom/homework",{
    Origin: window.location.hostname,
    user_token: token,
    class: classIdx
  });
}

export const getQnAPostList = (token, classIdx) => {
  return axios.post(URL+"classroom/getallqna",{
    Origin: window.location.hostname,
    user_token: token,
    class_id: classIdx
  })
}

export const getQnAPost = (token, classIdx, post_id) => {
  return axios.post(URL+"classroom/getqna",{
    Origin: window.location.hostname,
    user_token: token,
    class_id: classIdx,
    post_id: post_id
  });
}

export const writeQnAPost = (token, class_id, user_id, title, content) => {
  return axios.post(URL+"classroom/writeqna",{
    Origin: window.location.hostname,
    user_token: token,
    class_id: class_id,
    user_id: user_id,
    title: title,
    content: content
  })
}

export const getHomeworkPostList = (classIdx, token) =>{
  return axios.post(URL+"classroom/homework",{
    Origin: window.location.hostname,
    class: classIdx,
    user_token: token
  })
}
export const writeHomework = (classIdx, token, title, contents, deadline) => {
  return axios.post(URL+"classroom/writehomework",{
    Origin: window.location.hostname,
    class_id: classIdx,
    user_token: token,
    title: title,
    content: contents,
    deadline: deadline,
  })
}
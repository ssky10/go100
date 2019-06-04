import axios from "axios";

const DummyURL ="http://203.255.3.223";

const URL = "https://golony.dev/api/";

export const setNoticePost = (boardIdx, date, contents) => 
{
  axios.post(URL+"setNotice.php",{
    Origin: window.location.hostname,
    boardIdx: boardIdx,
    userID: "Teacher",
    date: date,
    contents: contents
  },{
    method: "post"
  })
  .then(res => {
    if(res){
      console.log("boardIdx : " + boardIdx);
      console.log("Date : "+date);
      console.log("contnets : "+contents);
      console.log(res);
      alert("Then : " + res.data.result);
      alert(res);
    }else{
      console.log(res);
      alert("실패");
    }
  });
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
  return axios.post(URL+"qna/writeqna",{
    Origin: window.loactaion.hostname,
    user_token: token,
    class_id: class_id,
    user_id: user_id,
    title: title,
    content: content
  })
}
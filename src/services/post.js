import axios from "axios";

const DummyURL ="http://203.255.3.223";

const URL = "https://golony.dev/api/";

export const setNoticePost = (boardIdx, date, contents) => 
{
  axios.post(URL+"setNotice.php",{
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
    user_token: token,
    class: classIdx,
    board_type: boardIdx
  });
}

export const setQnAPostList = (token, class_id) => {
  return axios.post(DummyURL+"setQnAPostList.php",{
    user_token: token,
    class_id: class_id
  });
}

export const getWorkPostList = ( token, classIdx, boardIdx) => {
  return axios.post(URL+"classroom/homework",{
    user_token: token,
    class: classIdx
  });
}

export const getQnAPostList = (token, classIdx) => {
  return axios.post(URL+"classroom/getallqna",{
    user_token: token,
    class_id: classIdx
  })
}

export const getQnAPost = (token, classIdx, post_id) => {
  return axios.post(URL+"classroom/getqna",{
    user_token: token,
    class_id: classIdx,
    post_id: post_id
  });
}
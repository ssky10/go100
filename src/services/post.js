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

export const setQnAPostList = () => {
  return axios.post(DummyURL+"setQnAPostList.php",{
  });
}

export const getWorkPostList = ( token, classIdx, boardIdx) => {
  return axios.post(URL+"classroom/homework",{
    user_token: token,
    class: classIdx,
    boardIdx: boardIdx
  });
}

export const getQnAPostList = (token, classIdx, boardIdx) => {
  return axios.post(DummyURL+"/getQnAPostList.php",{

  })
}

export const getQnAPost = (postid) => {
  return axios.post(DummyURL+"/getqnapost.php",{
    postid: postid
  });
}
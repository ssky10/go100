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

export const getNoticePostList = ( classIdx, boardIdx ) => {
  return axios.post(URL+"post/getNoticePosts",{
    class: classIdx,
    boardIdx: boardIdx
  });
}

export const getWorkPostList = (classIdx, boardIdx) => {
  return axios.post(URL+"post/getWorkBoard.php",{
    class: classIdx,
    boardIdx: boardIdx
  });
}

export const setQnAPostList = () => {
  return axios.post(DummyURL+"setQnAPostList.php",{
  })
}

export const getQnAPostList = () => {
  return axios.post(DummyURL+"/getQnAPostList.php",{

  })
}

export const getQnAPost = (postid) => {
  return axios.post(DummyURL+"/getqnapost.php",{
    postid: postid
  });
}
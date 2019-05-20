import axios from "axios";

const URL = "http://203.255.3.223/";

export const enter=()=> axios.post(URL+"board.php");

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

export const getNoticePostList = (board) => {
  return axios.get(URL+"board.php");
}

export const getWorkPostList = (board) => {
  return axios.get(URL+"workboard.php");
} 
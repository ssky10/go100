import axios from "axios";

const URL = "http://203.255.3.223/";

export const enter=()=> axios.post(URL+"board.php");

export const getNoticePostList = (board) => {
  return axios.get(URL+"board.php");
}

export const getWorkPostList = (board) => {
  return axios.get(URL+"workboard.php");
} 
import axios from "axios";

export function getQuestion(userToken, subject, num, code) {
  return axios.post("https://golony.dev/api/exam/getquestion", {
    Origin: window.location.hostname,
    subject: subject,
    user_token: userToken,
    num: num,
    code: code
  });
}

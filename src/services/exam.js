import axios from "axios";

export function getQuestion(userToken, subject, num, code) {
  if (subject === -1) {
    return axios.post("https://golony.dev/api/exam/note", {
      Origin: window.location.hostname,
      user_token: userToken
    });
  } else {
    return axios.post("https://golony.dev/api/exam/getquestion", {
      Origin: window.location.hostname,
      subject: subject,
      user_token: userToken,
      num: num,
      code: code
    });
  }
}

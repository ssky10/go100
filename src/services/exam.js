import axios from "axios";

export function getQuestion(subject, num, code) {
  return axios.post("https://golony.dev/api/exam/getquestion", {
    subject: subject,
    num: num,
    code: code
  });
}

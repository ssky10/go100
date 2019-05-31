import axios from "axios";

export const getQuestion = (userToken, subject, num, code) => {
  if (subject === -1) {
    return axios.post("https://golony.dev/api/exam/note", {
      Origin: window.location.hostname,
      user_token: userToken
    });
  } else if (subject === -2) {
    return axios.post("https://golony.dev/api/exam/myquestion", {
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
};

export function markQuestion(userToken, code, mark) {
  return axios.post("https://golony.dev/api/exam/marking", {
    Origin: window.location.hostname,
    user_token: userToken,
    code: code,
    marking: String(mark)
  });
}

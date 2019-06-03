import axios from "axios";

export function getList(token, class_id) {
  return axios.post("https://golony.dev/api/livequiz/livequizList", {
    Origin: window.location.hostname,
    user_token: token,
    class: parseInt(class_id)
  });
}

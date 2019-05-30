import axios from "axios";

export function getlist(token) {
    return axios.post("https://golony.dev/api/classroom/list", {
      Origin: window.location.hostname,
      user_token: token
    });
  }
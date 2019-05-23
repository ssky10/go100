import axios from "axios";

export function login(id, pw) {
  return axios.post("https://golony.dev/api/auth/login", {
    Origin: window.location.hostname,
    id: id,
    password: pw
  });
}

export function sendToken(token) {
  return axios.post("https://golony.dev/api/auth/add_token", {
    Origin: window.location.hostname,
    token: token
  });
}

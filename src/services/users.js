import axios from "axios";

export function _login(id, pw) {
  return axios.post("https://kakaoplus.ml/dummy/userCheck.php", {
    email: id,
    password: pw
  });
}

export function login(id, pw) {
  return axios.post("https://golony.dev/api/login", {
    Origin: window.location.hostname,
    email: id,
    password: pw
  });
}

export function sendToken(token) {
  return axios.post("https://golony.dev/api/add_token", {
    Origin: window.location.hostname,
    token: token
  });
}

import axios from "axios";

export function login(id, pw) {
  return axios.post("https://golony.dev/api/auth/login", {
    Origin: window.location.hostname,
    id: id,
    email: id,
    password: pw
  });
}

export function sendToken(user_token, fcm_token) {
  return axios.post("https://golony.dev/api/auth/add_token", {
    Origin: window.location.hostname,
    user_token: user_token,
    fcm_token: fcm_token
  });
}

export function deleteToken(user_token, fcm_token) {
  return axios.post("https://golony.dev/api/auth/delete_token", {
    Origin: window.location.hostname,
    user_token: user_token,
    fcm_token: fcm_token
  });
}

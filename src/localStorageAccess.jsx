export function saveToken(user_token) {
  localStorage.setItem("user_token", user_token);
}

export function deleteStorage() {
  localStorage.clear();
}

export function getToken() {
  const user_token = localStorage.getItem("user_token");
  if (user_token == null) return false;
  return user_token;
}

export function saveNotiToken(fcm_token) {
  localStorage.setItem("fcm_token", fcm_token);
}

export function getNotiToken() {
  const fcm_token = localStorage.getItem("fcm_token");
  if (fcm_token == null) return false;
  return fcm_token;
}

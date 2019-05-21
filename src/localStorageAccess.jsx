export function saveToken(user_token) {
  localStorage.setItem("user_token", user_token);
}

export function deleteToken() {
  localStorage.clear();
}

export function getToken() {
  const user_token = localStorage.getItem("user_token");
  if (user_token != null) return false;
  return user_token;
}

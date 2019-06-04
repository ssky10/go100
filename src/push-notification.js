import firebase from "firebase";

const permissionState = { status: false, token: "" };

export const initializeFirebase = () => {
  const config = {
    apiKey: "AIzaSyArauoSgGyn4Ldeogx0GMOQqH_5xvFPrmk",
    authDomain: "go100-f2882.firebaseapp.com",
    databaseURL: "https://go100-f2882.firebaseio.com",
    projectId: "go100-f2882",
    storageBucket: "go100-f2882.appspot.com",
    messagingSenderId: "422866319643",
    appId: "1:422866319643:web:aca3497acec09422"
  };
  firebase.initializeApp(config);

  const messaging = firebase.messaging();

  // Add the public key generated from the console here.
  messaging.usePublicVapidKey(
    "BNgQpZyrv8Ju20NTzRRrK-1C-9UjNhXcndo5jIBYv33rWq5Z9_9l02iJ5B5FeLNoNX12gVcFugvwm0B8qe7kTLM"
  );
};

export const requestPermission = () => {
  const messaging = firebase.messaging();

  //사용자에게 허가를 받아 토큰을 가져옵니다.
  return messaging
    .requestPermission()
    .then(function() {
      return messaging.getToken();
    })
    .then(function(token) {
      console.log(token);
      permissionState.status = true;
      permissionState.token = token;
      return permissionState;
    })
    .catch(function(err) {
      permissionState.status = false;
      permissionState.token = err;
      return permissionState;
    })
    .then(function(params) {
      if (params.status) {
        settingFirebase();
      }
    });
};

export const upDatePermissionState = () => {
  const messaging = firebase.messaging();

  //사용자에게 허가를 받아 토큰을 가져옵니다.
  return messaging
    .getToken()
    .then(function(token) {
      permissionState.status = true;
      permissionState.token = token;
      console.log(token);
      return permissionState;
    })
    .catch(function(err) {
      console.log(err);
    });
};

export const settingFirebase = () => {
  const messaging = firebase.messaging();

  // 토큰 값이 갱신되는 경우
  messaging.onTokenRefresh(function() {
    messaging
      .getToken()
      .then(function(refreshedToken) {
        console.log("Token refreshed.");
      })
      .catch(function(err) {
        console.log("Unable to retrieve refreshed token ", err);
      });
  });

  messaging.onMessage(function(payload) {
    console.log(payload.notification.title);
    console.log(payload.notification.body);
  });
};

export const deleteToken = () => {
  const messaging = firebase.messaging();

  return messaging
    .getToken()
    .then(function(currentToken) {
      return messaging
        .deleteToken(currentToken)
        .then(function() {
          console.log("Token deleted.");
          return true;
        })
        .catch(function(err) {
          console.log("Unable to delete token. ", err);
          return false;
        });
    })
    .catch(function(err) {
      console.log("Error retrieving Instance ID token. ", err);
      return false;
    });
};

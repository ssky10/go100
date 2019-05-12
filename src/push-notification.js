import firebase from "firebase";

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

  //사용자에게 허가를 받아 토큰을 가져옵니다.
  messaging
    .requestPermission()
    .then(function() {
      return messaging.getToken();
    })
    .then(function(token) {
      console.log(token);
    })
    .catch(function(err) {
      console.log("fcm error : ", err);
    });

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

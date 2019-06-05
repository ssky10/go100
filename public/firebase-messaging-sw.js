/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
importScripts("https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js");

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

// 푸시 메시지 전달시 실행 이벤트 리스너
self.addEventListener("push", function(event) {
  const title = event.data.json().notification.title;
  const options = {
    body: event.data.json().notification.body,
    icon: "/favicon.ico"
  };
  const notificationPromise = self.registration.showNotification(
    title,
    options
  );
  event.waitUntil(notificationPromise);
});

// 푸시 메시지 클릭시 실행 이벤트 리스너
self.addEventListener("notificationclick", function(event) {
  event.notification.close();

  var urlToOpen = new URL("/", self.location.origin).href;

  var promiseChain = clients
    .matchAll({
      // matchAll() 은 탭만 반환하고, 웹 워커는 제외합니다.
      type: "window",
      includeUncontrolled: true // 현재 서비스워커 이외의 다른 서비스워커가 제어하는 탭들도 포함합니다. 그냥 default로 항상 넣어주세요.
    })
    .then(windowClients => {
      // windowClients 는 현재 열린 탭들의 값입니다.
      var matchingClient = null;

      for (var i = 0; i < windowClients.length; i++) {
        var windowClient = windowClients[i];
        if (windowClient.url === urlToOpen) {
          matchingClient = windowClient;
          break;
        }
      }

      if (matchingClient) {
        return matchingClient.focus();
      } else {
        return clients.openWindow(urlToOpen);
      }
    });

  event.waitUntil(promiseChain);
});

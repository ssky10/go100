import * as firebase from "firebase";

export const initializeFirebase = () => {
  const config = {
    messagingSenderId: "422866319643"
  };
  firebase.initializeApp(config);
};

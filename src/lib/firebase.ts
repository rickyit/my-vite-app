import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDvByIqZtDbi6_jBqzrjAxk7nOUl3G-wTM",
  authDomain: "my-react-app-954ba.firebaseapp.com",
  projectId: "my-react-app-954ba",
  storageBucket: "my-react-app-954ba.appspot.com",
  messagingSenderId: "4267604951",
  appId: "1:4267604951:web:2d22b1b41ab40aa1a7a992",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

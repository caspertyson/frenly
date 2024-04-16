import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDpTMbfgN6Idcdj93mTlVxbx3QLkTYq8bs",
    authDomain: "pigeon--post.firebaseapp.com",
    projectId: "pigeon--post",
    storageBucket: "pigeon--post.appspot.com",
    messagingSenderId: "173932583512",
    appId: "1:173932583512:web:3cf5c61e26aec83e13082d",
    measurementId: "G-X8VDZ7V4P6"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleAuthProvider = new GoogleAuthProvider();

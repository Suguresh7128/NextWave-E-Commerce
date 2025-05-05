import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD7pdHZkvXFF1cVPk6FqsWVCKr4HyTfCDI",
  authDomain: "nxtwave-plp-9007e.firebaseapp.com",
  projectId: "nxtwave-plp-9007e",
  storageBucket: "nxtwave-plp-9007e.appspot.com", // FIXED: corrected domain
  messagingSenderId: "116423802438",
  appId: "1:116423802438:web:758e413f91ff3dce339447",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword };

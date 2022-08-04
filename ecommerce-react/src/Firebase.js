import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCo8Ba_vOtoo3ZOZPTv4LiJF1AlPMKrAAo",
  authDomain: "ecommerce-2dad4.firebaseapp.com",
  projectId: "ecommerce-2dad4",
  storageBucket: "ecommerce-2dad4.appspot.com",
  messagingSenderId: "249239917969",
  appId: "1:249239917969:web:e34f4daa24d93bad32f630"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
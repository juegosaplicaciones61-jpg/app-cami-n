import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDIj8DhJteT4YF4fs28YpUKRURa84jmlR0",
  authDomain: "app-camion-145cd.firebaseapp.com",
  projectId: "app-camion-145cd",
  storageBucket: "app-camion-145cd.firebasestorage.app",
  messagingSenderId: "1024131814443",
  appId: "1:1024131814443:web:8732cdd1f50ced7559466e"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
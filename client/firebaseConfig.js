// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBo_r1jJc7FDuhPWoDZzMSihWPO1SZr5n0",
  authDomain: "website-e-commerce-d015e.firebaseapp.com",
  projectId: "website-e-commerce-d015e",
  storageBucket: "website-e-commerce-d015e.appspot.com",
  messagingSenderId: "531047869097",
  appId: "1:531047869097:web:8dcba9a547ac568447d7b8",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

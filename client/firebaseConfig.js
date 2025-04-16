// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getEnv } from "./utils/env.js";

const firebaseConfig = {
  apiKey: getEnv("FIREBASE_APIKEY"),
  authDomain: getEnv("FIREBASE_AUTHDOMAIN"),
  projectId: getEnv("FIREBASE_PROJECTID"),
  storageBucket: getEnv("FIREBASE_STORAGEBUCKET"),
  messagingSenderId: getEnv("FIREBASE_MESSAGINGSENDERID"),
  appId: getEnv("FIREBASE_APPID"),
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

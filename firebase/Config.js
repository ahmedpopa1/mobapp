import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJ6UWrE-HSUQEV91CcvliENROXSIwHF9c",
  authDomain: "shop-609b5.firebaseapp.com",
  projectId: "shop-609b5",
  storageBucket: "shop-609b5.appspot.com",
  messagingSenderId: "618780107833",
  appId: "1:618780107833:web:abcfcf5b7eaf7f434d59e8",
};

// Initialize Firebase
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { app, db, auth, storage };

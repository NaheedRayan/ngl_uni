// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgd_6khuYyDWiDvQokRWmmK2u56gsQe3Q",
  authDomain: "ngl-uni.firebaseapp.com",
  projectId: "ngl-uni",
  storageBucket: "ngl-uni.appspot.com",
  messagingSenderId: "775106955804",
  appId: "1:775106955804:web:0997a451af34b98d9d2dd9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default getFirestore()
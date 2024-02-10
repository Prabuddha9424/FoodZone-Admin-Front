import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyCenHaAcYq99b0DO9vqqI54gpTCzFkYZ6w",
    authDomain: "foodzone-image.firebaseapp.com",
    projectId: "foodzone-image",
    storageBucket: "foodzone-image.appspot.com",
    messagingSenderId: "1083630958685",
    appId: "1:1083630958685:web:c646079c69d77737a9f5b4",
    measurementId: "G-QK230FDF2F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app);

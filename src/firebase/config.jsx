import {initializeApp} from 'firebase/app'
import { getFirestore } from '@firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBV5-uv4FU8-zFk_pL9IQCvpKy5lrFOv3s",
    authDomain: "reacttodo-e2494.firebaseapp.com",
    databaseURL: "https://reacttodo-e2494-default-rtdb.firebaseio.com",
    projectId: "reacttodo-e2494",
    storageBucket: "reacttodo-e2494.appspot.com",
    messagingSenderId: "250403159571",
    appId: "1:250403159571:web:6e207498fd450a7e6089e6",
    measurementId: "G-CTGMTGRPT6"
  };

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);




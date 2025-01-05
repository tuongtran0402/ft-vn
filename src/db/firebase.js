import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB1id9p96pPw-N2txLrAhVUq4Zdx0ZJPOw",
    authDomain: "family-tree-77f0f.firebaseapp.com",
    projectId: "family-tree-77f0f",
    storageBucket: "family-tree-77f0f.firebasestorage.app",
    messagingSenderId: "953282019411",
    appId: "1:953282019411:web:211bb07b3a77785b6746a6"
  };

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export { db };

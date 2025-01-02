import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAxyEpZHAevZ8wBSmPrMsrIltMg1WeSJ88",
    authDomain: "family-tree-trung-1.firebaseapp.com",
    projectId: "family-tree-trung-1",
    storageBucket: "family-tree-trung-1.firebasestorage.app",
    messagingSenderId: "932132032739",
    appId: "1:932132032739:web:71a3885cddc1d93eff35d6"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export { db };

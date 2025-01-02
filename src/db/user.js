import { collection, getDocs, setDoc, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase';


export const addData = async (data) => {
    try {
        await addDoc(doc(db, 'users'), data);
        console.log('Document successfully updated or created!');
    } catch (error) {
        console.error('Error updating or creating document: ', error);
    }
};

export const getAllData = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const data = querySnapshot.docs.map((doc) => ({
            id: doc.id, 
            ...doc.data()
        }));
        
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error getting documents: ', error);
        throw error;
    }
};


export const getSingleData = async (docId) => {
    try {
        const doc = await db.collection('users').doc(docId).get();
        if (doc.exists) {
            console.log('Document data:', doc.data());
        } else {
            console.log('No such document!');
        }
    } catch (error) {
        console.error('Error getting document: ', error);
    }
};

export const updateData = async (docId, data) => {
    try {
        await setDoc(doc(db, 'users', docId), data);
        console.log('Document successfully updated or created!');
    } catch (error) {
        console.error('Error updating or creating document: ', error);
    }
};


export const deleteData = async (docId) => {
    try {
        await deleteDoc(doc(db, 'users', docId));
        console.log('Document successfully deleted!');
    } catch (error) {
        console.error('Error removing document: ', error);
    }
};

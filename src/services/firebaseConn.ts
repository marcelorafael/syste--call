
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCzd0nCE48fG5ll4h2BgN5aEZ9pnQbBSaI",
    authDomain: "chamadas-52b41.firebaseapp.com",
    projectId: "chamadas-52b41",
    storageBucket: "chamadas-52b41.appspot.com",
    messagingSenderId: "842060162070",
    appId: "1:842060162070:web:00adacda979fc834264137",
    measurementId: "G-GSGN5N74KG"
};

const firebaseApp = initializeApp(firebaseConfig)

const auth =getAuth(firebaseApp)
const db = getFirestore(firebaseApp)
const storage = getStorage(firebaseApp)

export {
    auth,
    db,
    storage
}
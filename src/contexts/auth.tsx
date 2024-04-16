import React, { useState, useEffect, createContext } from "react";

import { db, auth, storage } from "../services/firebaseConn";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { addDoc, collection, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore'

import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const AuthContext = createContext({});

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const [customers, setCustomers] = useState<any>([]);
  const [loadCustomers, setLoadCustomers] = useState(true);

  const listRef = collection(db, 'customers');

  const navigate = useNavigate();


  async function signIn(email: string, password: string) {
    setLoadingAuth(true);

    await signInWithEmailAndPassword(auth, email, password)
      .then(async (value) => {
        let uid = value.user.uid;

        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef)

        let data = {
          uid: uid,
          name: docSnap?.data()?.name,
          email: value.user.email,
          avatarUrl: docSnap?.data()?.avatarUrl
        }

        setUser(data);
        storageUser(data);
        setLoadingAuth(false);

        navigate("/dashboards")
      })
      .catch((error) => {
        console.log(error);
        setLoadingAuth(false);
      })

  }

  async function signUp(name: string, email: string, password: string) {
    setLoadingAuth(true);

    await createUserWithEmailAndPassword(auth, email, password)
      .then(async value => {
        let uid = value.user.uid;

        await setDoc(doc(db, 'users', uid), {
          name: name,
          avatarUrl: null,
        })
          .then(() => {
            let data = {
              uid: uid,
              name: name,
              email: value.user.email,
              avatarUrl: null
            };

            setUser(data);
            storageUser(data)
            setLoadingAuth(false);

            navigate('/dashboards')
          })
      })
      .catch(error => {
        setLoadingAuth(false);
      })
  }


  function storageUser(data: any) {
    localStorage.setItem('@ticketsPRO', JSON.stringify(data))
  }

  async function logout() {
    await signOut(auth);
    localStorage.removeItem('@ticketsPRO');
    setUser(null);
  }

  async function registerCustomers(companyName: string, cnpj: string, address: string) {

    await addDoc(collection(db, 'customers'), {
      companyName: companyName,
      cnpj: cnpj,
      address: address,
    })


  }

  async function handleUpload(imageAvatar: any, name: string) {
    const currentUid = user?.uid;

    const uploadRef = ref(storage, `images/${currentUid}/${imageAvatar?.name}`)

    const uploadTask = uploadBytes(uploadRef, imageAvatar)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then(async (downloadURL) => {
          let urlPhoto = downloadURL;

          const docRef = doc(db, 'users', user?.uid)
          await updateDoc(docRef, {
            avatarUrl: urlPhoto,
            name: name,
          }).then(() => {
            let data = {
              ...user,
              name: name,
              avatarUrl: urlPhoto
            }

            setUser(data)
            storageUser(data)

          })
        })
      })
      .catch((error) => {
        console.log('Error uploadoc: ', error)
      })
  }

  async function editProfile(imageAvatar: any, name: string) {

    if (imageAvatar === null && name !== '') {

      const docRef = doc(db, 'users', user?.uid)
      updateDoc(docRef, {
        name: name
      })
        .then(() => {
          let data = {
            ...user,
            name: name
          }

          setUser(data)
          storageUser(data)

        })
        .catch((error) => {
          console.log('error edit profile: ', error)
        })
    } else if (name !== '' && imageAvatar !== null) {
      handleUpload(imageAvatar, name)
    }
  }

  async function getCustomers() {
    const querySnapshot = await getDocs(listRef)
      .then((snapshot: any) => {
        let list: any = [];

        snapshot.forEach((doc: any) => {
          list.push({
            id: doc.id,
            companyName: doc.data().companyName
          })
        })

        if (snapshot.docs.length === 0) {
          console.log('Nenhum cliente encontrado.')
          setCustomers([{ id: 1, nomeFantasia: 'Freela' }])
          setLoadCustomers(false)
          return
        }

        setCustomers(list)
        setLoadCustomers(false)

      })
      .catch((error) => {
        console.log('Erro ao buscar os clientes', error)
        setLoadCustomers(false);
        setCustomers([{ id: 1, nomeFantasia: 'Freela' }])
      })
  }

  useEffect(() => {
    async function loadUser() {
      const storageUserLocal = localStorage.getItem('@ticketsPRO')

      if (storageUserLocal) {
        setUser(JSON.parse(storageUserLocal))
        setLoading(false);
      }


      setLoading(false);

    }

    loadUser();
    getCustomers();
  }, [])

  return (
    <AuthContext.Provider value={{
      signed: !!user,
      user,
      loadingAuth,
      loading,
      customers,
      loadCustomers,
      signIn,
      signUp,
      logout,
      storageUser,
      setUser,
      registerCustomers,
      editProfile,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
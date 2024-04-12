import React, { useState, useEffect, createContext } from "react";

import { db, auth } from "../services/firebaseConn";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore'

import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<any>(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

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
    }, [])


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

    return (
        <AuthContext.Provider value={{
            signed: !!user,
            user,
            loadingAuth,
            loading,
            signIn,
            signUp,
            logout,
            storageUser,
            setUser,
            registerCustomers,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
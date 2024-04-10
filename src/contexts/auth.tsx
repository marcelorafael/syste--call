import React, { useState, useEffect, createContext } from "react";

import { db, auth } from "../services/firebaseConn";
import { createUserWithEmailAndPassword, } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'

export const AuthContext = createContext({});

function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<any>(null);
    const [loadingAuth, setLoadingAuth] = useState(false);

    function signIn(email: string, password: string) {
        console.log(email, password)
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

                        setLoadingAuth(false);
                    })
                })
                .catch(error => {
                    alert('Error ao cadastrar');
                    setLoadingAuth(false);
                })
    }

    return (
        <AuthContext.Provider value={{
            signed: !!user,
            user,
            loadingAuth,
            signIn,
            signUp,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
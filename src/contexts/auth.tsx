import React, { useState, useEffect, createContext } from "react";

export const AuthContext = createContext({});

function AuthProvider({children}: {children: React.ReactNode}) {
    const[user, setUser] = useState(null);

    function signIn(email: string, password: string) {
        console.log(email, password)
    }

    return (
        <AuthContext.Provider value={{
            signed: !!user,
            user,
            signIn
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
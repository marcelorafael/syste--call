import React, { useContext } from "react";
import { AuthContext } from "../contexts/auth";

export default function useAuth() {

    const {
        signed,
        user,
        loadingAuth,
        loading,
        signIn,
        signUp,
        logout,
        storageUser,
        setUser,
    }: any = useContext(AuthContext);

    return {
        signed,
        user,
        loadingAuth,
        loading,
        signIn,
        signUp,
        logout,
        storageUser,
        setUser,
    }
}
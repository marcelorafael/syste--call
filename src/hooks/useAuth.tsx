import React, { useContext } from "react";
import { AuthContext } from "../contexts/auth";

export default function useAuth() {

    const {
        signed,
        user,
        loadingAuth,
        signIn,
        signUp,
    }: any = useContext(AuthContext);

    return {
        signed,
        user,
        loadingAuth,
        signIn,
        signUp,
    }
}
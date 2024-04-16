import React, { useContext } from "react";
import { AuthContext } from "../contexts/auth";

export default function useAuth() {

    const {
        signed,
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
        registerTicket,
    }: any = useContext(AuthContext);

    return {
        signed,
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
        registerTicket,
    }
}
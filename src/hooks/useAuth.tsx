import React, { useContext } from "react";
import { AuthContext } from "../contexts/auth";

export default function useAuth() {

    const {
        signed,
        user,
        signIn
    }: any = useContext(AuthContext);

    return {
        signed,
        user,
        signIn
    }
}
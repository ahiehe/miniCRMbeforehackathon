"use client"

import {FC, ReactNode, useContext, useEffect} from "react";
import {AuthContext} from "@/features/auth/context/AuthContext";
import {useGetMeQuery, UserType} from "@/shared/api";
import {useUserStore} from "@/shared/store/user-store";


interface Props{
    children: ReactNode;
}

export const AuthProvider: FC<Props> = ({children}) => {

    const {user, isAuthorized, setUser, token} = useUserStore();
    const {data, loading, error, refetch} = useGetMeQuery({
        skip: !isAuthorized
    });

    useEffect(() => {
        if (!isAuthorized || !data || loading || !token){
            return;
        }
        if(data.getMe){
            const userInfo = {id: data.getMe.id, email: data.getMe.email, name: data.getMe.name} as UserType;
            setUser(userInfo)
        }
    }, [isAuthorized, token])


    return <AuthContext.Provider value={{refetch}}>
        {children}
    </AuthContext.Provider>
}
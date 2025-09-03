"use client"


import {FC} from "react";
import {useGetMeQuery} from "@/shared/api";


export const UserInfoContainer: FC = () => {

    const {data, loading, error} = useGetMeQuery()

    if (loading){
        return <div>gruzitsa</div>
    }

    if (error){
        return <div>oshibka {error.extraInfo}</div>
    }

    return <div>{data?.getMe.email}</div>
}
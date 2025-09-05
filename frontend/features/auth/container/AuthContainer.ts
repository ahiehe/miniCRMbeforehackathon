"use client"



import {FC, useEffect} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {TokenResponse, useLoginWithGoogleUserMutation} from "@/shared/api";
import {useUserStore} from "@/shared/store/user-store";


export const AuthContainer: FC = () => {
    const [auth] = useLoginWithGoogleUserMutation();
    const { authorize } = useUserStore();
    const router = useRouter();
    const searchParams = useSearchParams();
    const code = searchParams.get("code");

    const fetchToken = async () => {
        const response = await auth({variables: {code: (code || "")}})

        if (!response.data?.loginWithGoogleUser.token){
            return
        }
        const new_token: TokenResponse = {token: response.data.loginWithGoogleUser.token }
        authorize(new_token)
        router.replace("/");


    }

    useEffect(() => {
        if (!code){
            console.log("no code from google")
            return
        }

        fetchToken().then()

    }, [])

    return null
}
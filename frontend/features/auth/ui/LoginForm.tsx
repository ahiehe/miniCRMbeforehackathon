"use client"

import {FC, FormEvent, useCallback, useState} from "react";
import {Button} from "@/shared/ui/button";
import {FormInput} from "@/shared/components/FormInput";
import {useLoginUserLazyQuery, useLoginUserQuery} from "@/shared/api";



export const LoginForm: FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loginUser] = useLoginUserLazyQuery()



    const handleSubmit = useCallback( async (e: FormEvent) => {
        e.preventDefault();

        if (!email || !password ){
            return;
        }

        const response = await loginUser({variables: {email: email, password: password}})

        if (response.data?.loginUser.token){
            localStorage.setItem("token", response.data.loginUser.token)
        }


    }, [email, password, loginUser])

    return <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   type={"email"}
                   labelText={"Email"}
                   nameHTML={"email"}
        />

        <FormInput value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   type={"password"}
                   labelText={"Password"}
                   nameHTML={"password"}
        />

        <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
                Next
        </Button>
    </form>
}
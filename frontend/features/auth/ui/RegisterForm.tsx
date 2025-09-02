"use client"

import {ChangeEvent, FC, FormEvent, useCallback, useState} from "react";
import {Button} from "@/shared/ui/button";
import {FormInput} from "@/shared/components/FormInput";
import {useRegisterUserMutation, UserRegisterInput} from "@/shared/api";

export const RegisterForm: FC = () => {

    const [registerUser] = useRegisterUserMutation()

    const [info, setInfo] = useState<UserRegisterInput>({
        email: "",
        name: "",
        password: ""
    })

    const handleSubmit = useCallback( async (e: FormEvent) => {
        e.preventDefault();

        if (!info.email || !info.password || !info.name){
            return;
        }

        const response = await registerUser({variables: {user: info}})

        if (response.data?.registerUser.token){
            localStorage.setItem("token", response.data.registerUser.token)
        }


    }, [info, registerUser])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setInfo({...info, [name]: value})

    }

    return <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput value={info.name}
                   onChange={handleChange}
                   type={"text"}
                   labelText={"Name"}
                   nameHTML={"name"}
        />

        <FormInput value={info.email}
                   onChange={handleChange}
                   type={"email"}
                   labelText={"Email"}
                   nameHTML={"email"}
        />

        <FormInput value={info.password}
                   onChange={handleChange}
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
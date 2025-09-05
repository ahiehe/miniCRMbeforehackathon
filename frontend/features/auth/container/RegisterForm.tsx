"use client"

import {ChangeEvent, FC, FormEvent, useCallback, useState} from "react";
import {Button} from "@/shared/ui/button";
import {TokenResponse, useRegisterUserMutation, UserRegisterInput} from "@/shared/api";
import {SubmitHandler, useForm} from "react-hook-form";
import {cn} from "@/lib/utils";
import {Input} from "@/shared/ui/input";
import {useUserStore} from "@/shared/store/user-store";

export const RegisterForm: FC = () => {

    const [registerUser] = useRegisterUserMutation()
    const {authorize} = useUserStore()

    const {register, handleSubmit} = useForm<UserRegisterInput>({
        defaultValues: {
            email: "",
            name: "",
            password: ""
        }
    })

    const onSubmit: SubmitHandler<UserRegisterInput> = async (values) => {
        const response = await registerUser({variables: {user: values}})
        if (response.data?.registerUser.token){
            authorize({token: response.data.registerUser.token} as TokenResponse)
        }
    }


    return <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input className={cn("bg-background")} placeholder={"Имя"} {...register("name")} />
        <Input className={cn("bg-background")} placeholder={"email"} {...register("email")} />
        <Input className={cn("bg-background")} placeholder={"password"} {...register("password")} />

        <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"

            >
                Next
        </Button>
    </form>
}
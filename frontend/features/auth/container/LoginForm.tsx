"use client"

import {FC, FormEvent, useCallback, useState} from "react";
import {Button} from "@/shared/ui/button";
import {FormInput} from "@/shared/components/FormInput";
import {useLoginUserLazyQuery, useLoginUserQuery, UserLoginInput} from "@/shared/api";
import {Input} from "@/shared/ui/input";
import {cn} from "@/lib/utils";
import {SubmitHandler, useForm} from "react-hook-form";



export const LoginForm: FC = () => {

    const [loginUser] = useLoginUserLazyQuery()

    const {register, handleSubmit} = useForm<UserLoginInput>({
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit: SubmitHandler<UserLoginInput> = async (values) => {
        const response = await loginUser({variables: {userCredentials: values}})

        if (response.data?.loginUser.token){
            localStorage.setItem("token", response.data.loginUser.token)
        }


    }

    return <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
"use client"

import {FC, useState} from "react";
import {Button} from "@/shared/ui/button";
import {FormInput} from "@/shared/components/FormInput";



export const RegisterForm: FC = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return <form className="space-y-4">
        <FormInput value={name}
                   onChange={(e) => setName(e.target.value)}
                   type={"text"}
                   labelText={"Name"}
                   nameHTML={"name"}
        />

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
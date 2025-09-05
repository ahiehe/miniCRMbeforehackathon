"use client"


import {FC} from "react";
import {useGetMeQuery} from "@/shared/api";
import {useUserStore} from "@/shared/store/user-store";
import {Button} from "@/shared/ui/button";
import { useRouter } from "next/navigation";

export const UserInfoContainer: FC = () => {
    const router = useRouter();
    const {user, unAuthorize} = useUserStore();

    const logout = () => {
        unAuthorize();
        localStorage.removeItem("user-storage");
        router.replace("/");
    }

    return <div>
        {user &&
            <div>
                <div>{user.email}</div>
                <div>{user.name}</div>
                <Button onClick={logout}>logout</Button>
            </div>
        }
    </div>
}
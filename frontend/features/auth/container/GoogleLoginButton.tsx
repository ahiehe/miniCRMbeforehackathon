"use client"


import {FC} from "react";
import {Button} from "@/shared/ui/button";


export const GoogleLoginButton: FC = () => {

    const handleClick = () => {
        const params = new URLSearchParams({
              client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
              redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI!,
              response_type: "code",
              scope: "openid email profile",
              access_type: "offline",
              prompt: "consent"
            })
        console.log(params.toString())
        console.log(`https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`)
        window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
  }

    return <div>
        <Button onClick={handleClick}>Google</Button>
    </div>
}
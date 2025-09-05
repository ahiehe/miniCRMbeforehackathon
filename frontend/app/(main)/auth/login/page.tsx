import {FC} from "react";
import {LoginForm} from "@/features/auth/container/LoginForm";
import {GoogleLoginButton} from "@/features/auth/container/GoogleLoginButton";


const LoginPage: FC = () => {

    return  <div>
        <LoginForm />
        <GoogleLoginButton/>
    </div>
}

export default LoginPage;
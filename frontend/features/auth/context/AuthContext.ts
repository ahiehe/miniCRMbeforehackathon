import {createContext} from "react";

export interface AuthContextValue{
    refetch: () => void;
}


export const AuthContext = createContext<AuthContextValue | undefined>(undefined)
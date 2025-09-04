import {UserType} from "@/shared/api";
import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware"


interface TokenType{
    accessToken: string
}

export interface UserStoreState{
    user: UserType | undefined,
    setUser: (user: UserType) => void;
    token: TokenType | undefined,
    isAuthorized: boolean,
    authorize: (token: TokenType) => void,
    unAuthorize: () => void,
}
const localStorage = typeof window !== "undefined" ? window.localStorage : undefined;

let initialToken: TokenType | undefined = undefined

const token = localStorage?.getItem("token")
if (token){
    initialToken = {accessToken: token} as TokenType
}
const isAuthorized = !!initialToken;

export const useUserStore = create<UserStoreState>()(
    persist(
        (set) =>({
            token: initialToken,
            user: undefined,
            isAuthorized: isAuthorized,
            authorize: (token) => {
                set(() => ({
                    token: {
                        accessToken: token.accessToken,
                    },
                    isAuthorized: true
                }));
            },
            unAuthorize: () => {
                set(() => ({
                    isAuthorized: false,
                    token: undefined,
                    user: undefined
                }));
            },
            setUser: (user: UserType) => {
                set(() => ({
                    user: user
                }))
            }
        }),
        {
            name: "user-storage",
            storage: createJSONStorage(() => localStorage as Storage),
        }
    )
)




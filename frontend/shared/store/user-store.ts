import {TokenResponse, UserType} from "@/shared/api";
import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware"



export interface UserStoreState{
    user: UserType | undefined,
    setUser: (user: UserType) => void;
    token: TokenResponse | undefined,
    isAuthorized: boolean,
    authorize: (token: TokenResponse) => void,
    unAuthorize: () => void,
}
const localStorage = typeof window !== "undefined" ? window.localStorage : undefined;

let initialToken: TokenResponse | undefined = undefined

const token = localStorage?.getItem("token")
if (token){
    initialToken = {token: token} as TokenResponse
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
                        token: token.token,
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




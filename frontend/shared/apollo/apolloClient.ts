"use client";

import {ApolloClient, ApolloLink, HttpLink, InMemoryCache} from '@apollo/client';
import {useUserStore} from "@/shared/store/user-store";


const apiUrl = "http://localhost:8000/graphql" //import.meta.env.VITE_API_URL;


const authLink = new ApolloLink((operation, forward) => {
    const {token} = useUserStore.getState();


    if (token) {
        operation.setContext(({headers = {}}) => ({
            headers: {
                ...headers,
                Authorization: `Bearer ${token.token}`,
            },
        }));
    }

    return forward(operation).map((response) => {
        let shouldLogout = false;
        // Обрабатываем ошибки, если они есть
        response.errors?.forEach((error) => {
            const errorCode = error.extensions?.code;

            if (errorCode === 401) {
                shouldLogout = true;
            }

            /*if (error.message) {
                toast.error(error.message);
            }*/
        });

        /*if (shouldLogout) {
            store.dispatch(authSlice.actions.logout());
        }*/

        return response;
    });
});


const httpLink = new HttpLink({
    uri: apiUrl,
});


export const client = new ApolloClient({
    link: ApolloLink.from([authLink, httpLink]),
    cache: new InMemoryCache({
        typePolicies: {
            UserType: {
                keyFields: false
            }
        }
    }),
});


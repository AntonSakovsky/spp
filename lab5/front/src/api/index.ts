import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import axios from "axios";

import { API_URL, routes } from "@constants/constants";
import { userStore } from "@mobx/UserStore/UserStore";
import { AuthResponse } from "@type/models/response/types";

export const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});


const httpLink = new HttpLink({
    uri: API_URL + "graphql",
});

const errorLink = onError((error) => {
    const { graphQLErrors } = error;
    if (graphQLErrors) {
        for (const err of graphQLErrors) {
            if (err.extensions?.code === "UNAUTHENTICATED") {
                console.log("UNAUTHENTICATED");
                axios
                    .post<AuthResponse>(`${API_URL}auth/refresh`, null, {
                        withCredentials: true,
                    })
                    .then((res) => {
                        userStore.setUser(res.data.user, res.data.accessToken);
                        // forward(operation);
                    })
                    .catch((e) => {
                        console.log(e);
                        window.location.href = routes.AUTH + "/" + routes.LOGIN_PAGE;
                    });
            }
        }
    }
});

const interceptors = new ApolloLink((operation, forward) => {
    const token = userStore.accessToken;
    operation.setContext({
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return forward(operation).map((response) => {
        return response;
    });
});

const apolloLink = ApolloLink.from([errorLink, interceptors, httpLink]);

export const client = new ApolloClient({
    link: apolloLink,
    cache: new InMemoryCache(),
});

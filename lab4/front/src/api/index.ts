import axios from "axios";

import { API_URL, routes } from "@constants/constants";
import { userStore } from "@mobx/UserStore/UserStore";
import { AuthResponse } from "@type/models/response/types";

export const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

export const refreshToken = async () => {
   
        const response = await axios.post<AuthResponse>(`${API_URL}auth/refresh`, null, {
            withCredentials: true,
        });

        userStore.setUser(response.data.user, response.data.accessToken);

        return response.data.accessToken;
}

api.interceptors.request.use((config) => {
    const token = userStore.accessToken;
    config.headers.Authorization = `Bearer ${token}`;

    return config;
});

api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        
        const originalRequest = error.config;
        const pathname = window.location.pathname;
        const isAuthPage = pathname.match(/auth/);
        if (error.response.status == 401 && error.config && !error.config._isRetry && !isAuthPage) {
            originalRequest._isRetry = true;
            try {
                const response = await axios.post<AuthResponse>(`${API_URL}auth/refresh`, null, {
                    withCredentials: true,
                });

                userStore.setUser(response.data.user, response.data.accessToken);

                return api.request(originalRequest);
            } catch (e) {
                console.log(e);
                window.location.href = routes.AUTH + "/" + routes.LOGIN_PAGE;
            }
        }

        throw error;
    },
);

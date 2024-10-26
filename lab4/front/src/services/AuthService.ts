import { api } from "@api/index";
import { AuthResponse } from "@type/models/response/types";
import { AxiosResponse } from "axios";

export class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return api.post<AuthResponse>("auth/login", { email, password });
    }

    static async registration(
        email: string,
        password: string,
        username: string,
    ): Promise<AxiosResponse<AuthResponse>> {
        return api.post<AuthResponse>("auth/registration", { email, password, username });
    }

    static async logout(): Promise<void> {
        return api.post("auth/logout");
    }

    static async refresh(): Promise<AxiosResponse<AuthResponse>> {
        return await api.post<AuthResponse>("auth/refresh");
    }
}

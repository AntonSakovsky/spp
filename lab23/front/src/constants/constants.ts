import { StatusType } from "@type/types";

export const enum routes {
    AUTH = "/auth",
    LOGIN_PAGE = "login",
    REGISTER_PAGE = "register",
    MAIN = "/",
}

export const STATUS_COLORS: Record<StatusType, string> = {
    done: "#2d9965",
    todo: "#9b9b9b",
    "in progress": "#2e7cd1",
};

export const API_URL = "http://localhost:3000/";

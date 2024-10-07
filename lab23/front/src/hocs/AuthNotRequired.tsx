import { routes } from "@constants/constants";
import { useAuth } from "@hooks/useAuth";
import { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

export const AuthNotRequired: FC<PropsWithChildren> = ({ children }) => {
    const { isAuth, isLoading } = useAuth();

    if (isLoading) return null;

    if (isAuth) {
        return <Navigate to={routes.MAIN} />;
    }

    return children;
};

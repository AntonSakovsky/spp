import { useStore } from "@mobx/rootStore-context";
import { AuthService } from "@services/AuthService";
import { useEffect, useState } from "react";

export const useAuth = () => {
    const { userStore } = useStore();
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const me = async () => {
            try {
                const response = await AuthService.refresh();
                userStore.setUser(response.data.user, response.data.accessToken);
                setIsAuth(true);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        me();
    }, [userStore]);

    return { isAuth, isLoading };
};

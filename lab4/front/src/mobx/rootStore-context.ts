import { createContext, useContext } from "react";
import { Store } from "./rootStore";

const RootStoreContext = createContext<Store | null>(null);

export const useStore = () => {
    const context = useContext(RootStoreContext);

    if (!context) {
        throw new Error("Seems like you don't wrap your app with RootStoreContext");
    }

    return context;
};

export const RootStoreProvider = RootStoreContext.Provider;

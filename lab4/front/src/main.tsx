import { CssBaseline } from "@mui/material";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { RootStoreProvider } from "@mobx/rootStore-context.ts";
import { Store } from "@mobx/rootStore.ts";
import { AppRouter } from "./AppRouter.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
    <>
        <CssBaseline />
        <RootStoreProvider value={new Store()}>
            <RouterProvider router={AppRouter} />
        </RootStoreProvider>
    </>,
);

import { WebSocketProvider } from "@context/WebsocketContext";
import { Outlet } from "react-router-dom";

import style from "./AppLayout.module.scss";
import { Header } from "./Header/Header";

export const AppLayout = () => (
    <WebSocketProvider>
        <div className={style.appLayout}>
            <Header />
            <Outlet />
        </div>
    </WebSocketProvider>
);

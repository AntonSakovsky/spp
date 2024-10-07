import { Outlet } from "react-router-dom";

import style from "./AuthLayout.module.scss";

export const AuthLayout = () => (
    <div className={style.authPage}>
        <div className={style.forms}>
            <Outlet />
        </div>
    </div>
);

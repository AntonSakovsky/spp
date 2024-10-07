import { Avatar } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { MdOutlineLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { routes } from "@constants/constants";
import { useStore } from "@mobx/rootStore-context";
import { AuthService } from "@services/AuthService";

import style from "./Header.module.scss";

export const Header = () => {
    const { userStore } = useStore();
    const navigate = useNavigate();

    const logout = async () => {
        try {
            await AuthService.logout();
            navigate(routes.AUTH + "/" + routes.LOGIN_PAGE);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <header className={style.header}>
            <div className={style.logo}>
                <span>To</span>-Do
            </div>
            <div className={style.userInfo}>
                <div className={style.userPhoto}>
                    <Avatar sx={{ bgcolor: deepPurple[500] }} className={style.avatar}>
                        {userStore.user?.username.charAt(0)}
                    </Avatar>
                </div>
                <span className={style.userName}>{userStore.user?.username}</span>
                <div className={style.logoutBtnWrap} onClick={logout}>
                    <div className={style.logoutBtn}>
                        <MdOutlineLogout color="red" size={16} />
                    </div>
                </div>
            </div>
        </header>
    );
};

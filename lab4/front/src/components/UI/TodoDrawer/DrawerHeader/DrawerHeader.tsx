import { Typography } from "@mui/material";
import { FC, ReactNode } from "react";
import { IoClose } from "react-icons/io5";

import style from "./DrawerHeader.module.scss";

type DrawerHeaderProps = {
    text: string;
    icon: ReactNode;
    onClose: () => void;
};

export const DrawerHeader: FC<DrawerHeaderProps> = ({ text, icon, onClose }) => {
    return (
        <div className={style.header}>
            <div className={style.title}>
                {icon}
                <Typography variant="h5" className={style.text}>{text}</Typography>
            </div>

            <div className={style.closeBtn} onClick={onClose}>
                <IoClose className={style.closeIcon} />
            </div>
        </div>
    );
};

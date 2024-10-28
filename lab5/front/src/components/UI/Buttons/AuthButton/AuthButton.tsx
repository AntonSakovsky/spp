import { Button } from "@mui/material";
import { FC } from "react";
import cn from 'classnames';

import style from "./AuthButton.module.scss";

type AuthButtonProps = {
    text: string;
    disabled: boolean;
};

export const AuthButton: FC<AuthButtonProps> = ({ text, disabled }) => {
    return (
        <Button variant="contained" type="submit" className={cn(style.authBtn, style.btn)} disabled={disabled}>
            {text}
        </Button>
    );
};

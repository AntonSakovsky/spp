import { FC, ReactNode } from "react";
import cn from 'classnames';
import { Button } from "@mui/material";

import style from "./AddTodoButton.module.scss";

type AddTodoButtonProps = {
    onClick: () => void;
    icon?: ReactNode;
    text?: string;
    className?: string;
};

export const AddTodoButton: FC<AddTodoButtonProps> = ({ icon, text, className, onClick }) => {
    return (
        <Button className={cn(style.addTodo, style.btn, className)} onClick={onClick}>
            {icon}
            <span>{text}</span>
        </Button>
    );
};

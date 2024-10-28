import cn from "classnames";
import { FC } from "react";

import { StatusType } from "@type/types";
import style from "./Status.module.scss";

type StatusProps = {
    status: StatusType;
};

export const Status: FC<StatusProps> = ({ status }) => {
    const textStatus =
        status === "DONE" ? "done" : status === "IN_PROGRESS" ? "in progress" : "todo";

    return (
        <span
            className={cn(
                style.status,
                { [style.done]: status === "DONE" },
                { [style.inProgress]: status === "IN_PROGRESS" },
                { [style.todo]: status === "TODO" },
            )}
        >
            <span
                className={cn(
                    style.indicator,
                    { [style.done]: status === "DONE" },
                    { [style.inProgress]: status === "IN_PROGRESS" },
                    { [style.todo]: status === "TODO" },
                )}
            ></span>
            <span className={style.statusText}>{textStatus}</span>
        </span>
    );
};

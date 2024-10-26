import cn from "classnames";
import { FC } from "react";

import { StatusType } from "@type/types";
import style from "./Status.module.scss";

type StatusProps = {
    status: StatusType;
};

export const Status: FC<StatusProps> = ({ status }) => (
    <span
        className={cn(
            style.status,
            { [style.done]: status === "done" },
            { [style.inProgress]: status === "in progress" },
            { [style.todo]: status === "todo" },
        )}
    >
        <span
            className={cn(
                style.indicator,
                { [style.done]: status === "done" },
                { [style.inProgress]: status === "in progress" },
                { [style.todo]: status === "todo" },
            )}
        ></span>
        <span className={style.statusText}>{status}</span>
    </span>
);

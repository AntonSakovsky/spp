import { FC } from "react";

import style from "./TaskTitle.module.scss";

type TaskTitleProps = {
    text: string;
    readonly: boolean;
    onChange: (text: string) => void;
};

export const TaskTitle: FC<TaskTitleProps> = ({ text, readonly, onChange }) => {
    return (
        <div className={style.taskName}>
            <input
                type="text"
                value={text}
                readOnly={readonly}
                onChange={(e) => onChange(e.target.value)}
                className={style.input}
            />
        </div>
    );
};

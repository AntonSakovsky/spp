import { Status } from "@components/pages/TodosPage/KanbanBoard/StatusBoard/Status/Status";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { FC } from "react";

import { StatusType } from "@type/types";
import style from "./SelectInput.module.scss";

type SelectInputProps = {
    onChange: (e: SelectChangeEvent) => void;
    status: StatusType;
};

export const SelectInput: FC<SelectInputProps> = ({ status, onChange }) => {
    return (
        <Select value={status} className={style.select} onChange={onChange}>
            <MenuItem value={"todo"}>
                <Status status="todo" />
            </MenuItem>
            <MenuItem value={"in progress"}>
                <Status status="in progress" />
            </MenuItem>
            <MenuItem value={"done"}>
                <Status status="done" />
            </MenuItem>
        </Select>
    );
};

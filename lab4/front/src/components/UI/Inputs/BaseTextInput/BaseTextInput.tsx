/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextField } from "@mui/material";
import { FieldInputProps, FieldMetaProps } from "formik";
import { FC } from "react";
import style from "./BaseTextInput.module.scss";

type BaseTextInputProps = {
    type: string;
    label: string;
    field: FieldInputProps<any>;
    meta: FieldMetaProps<any>;
    helperText: string;
};

export const BaseTextInput: FC<BaseTextInputProps> = ({ label, type, field, meta, helperText }) => {
    return (
        <div className={style.inputWrap}>
            <TextField
                type={type}
                label={label}
                {...field}
                variant="filled"
                error={Boolean(meta.error && meta.touched)}
                size="small"
                helperText={meta.touched && meta.error ? meta.error : helperText}
                className={style.baseInput}
            />
           
        </div>
    );
};

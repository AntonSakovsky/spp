import { useField } from "formik";
import { FC } from "react";
import { BaseTextInput } from "../BaseTextInput/BaseTextInput";

type PasswordInputProps = {
    name: string;
    helperText: string;
    label: string;
};

export const PasswordInput: FC<PasswordInputProps> = ({ helperText, label, name }) => {
    const [field, meta] = useField(name);

    return (
        <BaseTextInput
            field={field}
            label={label}
            meta={meta}
            type="password"
            helperText={helperText}
        />
    );
};

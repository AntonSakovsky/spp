import { useField } from "formik";
import { FC } from "react";
import { BaseTextInput } from "../BaseTextInput/BaseTextInput";

type TextInputProps = {
    name: string;
    label: string;
    helperText: string;
};

export const TextInput: FC<TextInputProps> = ({ helperText, label, name }) => {
    const [field, meta] = useField(name);

    return (
        <BaseTextInput
            label={label}
            field={field}
            helperText={helperText}
            meta={meta}
            type="text"
        />
    );
};

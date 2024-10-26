import { useField } from "formik";
import { FC } from "react";

import { BaseTextInput } from "../BaseTextInput/BaseTextInput";

type EmailInputProps = {
    name: string;
    label: string;
    helperText: string;
};

export const EmailInput: FC<EmailInputProps> = ({ label, helperText, name }) => {
    const [field, meta] = useField(name);

    return (
        <BaseTextInput
            type="email"
            field={field}
            meta={meta}
            label={label}
            helperText={helperText}
        />
    );
};

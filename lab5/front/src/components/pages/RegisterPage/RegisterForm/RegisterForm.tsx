import { Form, Formik, FormikHelpers } from "formik";
import { Link, useNavigate } from "react-router-dom";

import { AlternativeAuth } from "@components/UI/AlternativeAuth/AlternativeAuth";
import { AuthButton } from "@components/UI/Buttons/AuthButton/AuthButton";
import { EmailInput } from "@components/UI/Inputs/EmailInput/EmailInput";
import { PasswordInput } from "@components/UI/Inputs/PasswordInput/PasswordInput";
import { TextInput } from "@components/UI/Inputs/TextInput/TextInput";
import { routes } from "@constants/constants";
import { useStore } from "@mobx/rootStore-context";
import { AuthService } from "@services/AuthService";
import { registerSchema } from "@utils/validators/registerSchema";
import style from "./RegisterForm.module.scss";

type RegisterFormData = {
    username: string;
    email: string;
    password: string;
};

export const RegisterForm = () => {
    const navigate = useNavigate();
    const { userStore } = useStore();

    const handleSubmit = async (
        values: RegisterFormData,
        helpers: FormikHelpers<RegisterFormData>,
    ) => {
        try {
            const response = await AuthService.registration(
                values.email,
                values.password,
                values.username,
            );

            userStore.setUser(response.data.user, response.data.accessToken);
            navigate(routes.MAIN);
        } catch (error) {
            console.log(error);
        } finally {
            helpers.resetForm();
        }
    };

    return (
        <Formik
            initialValues={{ username: "", email: "", password: "" }}
            onSubmit={handleSubmit}
            validationSchema={registerSchema}
        >
            {({ isValid, isSubmitting, dirty }) => (
                <div className={style.formWrap}>
                    <Form className={style.form}>
                        <TextInput label="Username" helperText="Your username" name="username" />
                        <EmailInput label="Email" helperText="Enter existing email" name="email" />
                        <PasswordInput
                            label="Password"
                            helperText="Enter at least 8 symbols"
                            name="password"
                        />

                        <AuthButton text="Sign up" disabled={!isValid || isSubmitting || !dirty} />

                        <AlternativeAuth />

                        <div className={style.heplerText}>
                            Already have an account?{" "}
                            <Link to={`${routes.AUTH}/${routes.LOGIN_PAGE}`}>Sign in</Link>
                        </div>
                    </Form>
                </div>
            )}
        </Formik>
    );
};

import { Form, Formik, FormikHelpers } from "formik";
import { Link, useNavigate } from "react-router-dom";

import { AlternativeAuth } from "@components/UI/AlternativeAuth/AlternativeAuth";
import { AuthButton } from "@components/UI/Buttons/AuthButton/AuthButton";
import { EmailInput } from "@components/UI/Inputs/EmailInput/EmailInput";
import { PasswordInput } from "@components/UI/Inputs/PasswordInput/PasswordInput";
import { routes } from "@constants/constants";
import { useStore } from "@mobx/rootStore-context";
import { AuthService } from "@services/AuthService";
import { loginSchema } from "@utils/validators/loginSchema";
import style from "./LoginForm.module.scss";

type LoginFormData = {
    email: string;
    password: string;
};

export const LoginForm = () => {
    const navigate = useNavigate();
    const { userStore } = useStore();

    const handleSubmit = async (values: LoginFormData, helpers: FormikHelpers<LoginFormData>) => {
        try {
            const response = await AuthService.login(values.email, values.password);
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
            initialValues={{ email: "", password: "" }}
            onSubmit={handleSubmit}
            validationSchema={loginSchema}
        >
            {({ isValid, isSubmitting, dirty }) => (
                <div className={style.formWrap}>
                    <Form className={style.form}>
                        <EmailInput label="Email" helperText="Enter existing email" name="email" />
                        <PasswordInput
                            label="Password"
                            helperText="Enter at least 8 symbols"
                            name="password"
                        />

                        <AuthButton text="Sign in" disabled={!isValid || isSubmitting || !dirty} />

                        <AlternativeAuth />

                        <div className={style.heplerText}>
                            Don’t have an account?{" "}
                            <Link to={`${routes.AUTH}/${routes.REGISTER_PAGE}`}>Sign Up</Link>
                        </div>
                    </Form>
                </div>
            )}
        </Formik>
    );
};

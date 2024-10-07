import createAccount from "@assets/img/create-account.png";
import { AuthFormSkeleton } from "@components/UI/Form/AuthFormSkeleton/AuthFormSkeleton";
import { RegisterForm } from "./RegisterForm/RegisterForm";

export const RegisterPage = () => {
    return (
        <AuthFormSkeleton
            title="Create Account,"
            subtitle="Sign up to get started"
            image={createAccount}
            imageAlt="Create account"
            form={<RegisterForm />}
        />
    );
};

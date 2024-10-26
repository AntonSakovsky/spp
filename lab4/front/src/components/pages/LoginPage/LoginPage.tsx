import welcome from "@assets/img/welcome2.png";
import { AuthFormSkeleton } from "@components/UI/Form/AuthFormSkeleton/AuthFormSkeleton";
import { LoginForm } from "./LoginForm/LoginForm";

export const LoginPage = () => (
    <AuthFormSkeleton
        form={<LoginForm />}
        image={welcome}
        title="Welcome back"
        subtitle="Let's sign you again"
        imageAlt="Welcome"
    />
);

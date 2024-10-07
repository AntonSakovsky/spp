import { AppLayout } from "@components/layouts/AppLayout/AppLayout";
import { TodosPage } from "@components/pages/TodosPage/TodosPage";
import { AuthNotRequired } from "@hocs/AuthNotRequired";
import { AuthRequired } from "@hocs/AuthRequired";
import { createBrowserRouter } from "react-router-dom";
import { AuthLayout } from "./components/layouts/AuthLayout/AuthLayout";
import { LoginPage } from "./components/pages/LoginPage/LoginPage";
import { RegisterPage } from "./components/pages/RegisterPage/RegisterPage";
import { routes } from "./constants/constants";

export const AppRouter = createBrowserRouter([
    {
        path: routes.AUTH,
        element: (
            <AuthNotRequired>
                <AuthLayout />
            </AuthNotRequired>
        ),
        children: [
            {
                path: routes.LOGIN_PAGE,
                element: <LoginPage />,
            },
            {
                path: routes.REGISTER_PAGE,
                element: <RegisterPage />,
            },
        ],
    },
    {
        path: routes.MAIN,
        element: (
            <AuthRequired>
                <AppLayout />
            </AuthRequired>
        ),
        children: [
            {
                path: "",
                element: <TodosPage />,
            },
        ],
    },
]);

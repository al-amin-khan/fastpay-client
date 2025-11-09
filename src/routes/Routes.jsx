import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Loading from "../components/Loading";
import AuthLayout from "../layouts/AuthLayout";

const router = createBrowserRouter([
    {
        path: "/",
        hydrateFallbackElement: <Loading />,
        element: <RootLayout />,
        children: [
            {
                path: "/",
                element: <>Home Page</>,
            },
            {
                path: "/bills",
                element: <>Bills Page</>,
            },
        ],
    },
    {
        path: "auth",
        hydrateFallbackElement: <Loading />,
        element: <AuthLayout />,
        children: [
            {
                path: "login",
                element: <>Login Page</>,
            },
            {
                path: "register",
                element: <>Register Page</>,
            },
        ],
    }
]);

export default router;
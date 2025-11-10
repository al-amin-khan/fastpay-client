import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Loading from "../components/Loading";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "../auth/ProtectedRoute";
import MyBills from "../pages/MyBills";
import Home from "../pages/Home";
import BillDetail from "../pages/BillDetail";
import AllBills from "../pages/AllBills";

const router = createBrowserRouter([
    {
        path: "/",
        hydrateFallbackElement: <Loading />,
        element: <RootLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/bills",
                element: <AllBills />,
            },
            {
                path: "/bills/:id",
                element: (
                    <ProtectedRoute>
                        <BillDetail />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/my-bills",
                element: (
                    <ProtectedRoute>
                        <MyBills />
                    </ProtectedRoute>
                ),
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
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
        ],
    }
]);

export default router;
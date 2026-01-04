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
import PageNotFound from "../components/PageNotFound";
import About from "../pages/About";
import Pricing from "../pages/Pricing";
import Support from "../pages/Support";

const router = createBrowserRouter([
    {
        path: "/",
        hydrateFallbackElement: <Loading />,
        element: <RootLayout />,
        errorElement: <PageNotFound />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/bills",
                element: <AllBills />,
            },
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/pricing",
                element: <Pricing />,
            },
            {
                path: "/support",
                element: <Support />,
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
            {
                path: "*",
                element: <PageNotFound />,
            }
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
            {
                path: "*",
                element: <PageNotFound />,
            }
        ],
    },
    {
        path: "*",
        element: <PageNotFound />,
    }
]);

export default router;

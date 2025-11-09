import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div>
            Auth Layout
            <Outlet />
        </div>
    );
};

export default AuthLayout;
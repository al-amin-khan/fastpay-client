import { Outlet } from 'react-router';

const RootLayout = () => {
    return (
        <>
            Root Layout
            <Outlet />
        </>
    );
};

export default RootLayout;
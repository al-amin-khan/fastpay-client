import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AuthLayout = () => {
    return (
        <div>
            <nav>
                <Navbar />
            </nav>

            <main>
                <Outlet />
            </main>
            
            <nav>
                <Footer />
            </nav>
        </div>
    );
};

export default AuthLayout;
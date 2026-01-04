import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const RootLayout = () => {
    return (
        <>
            <nav className='py-3'>
                <Navbar />
            </nav>
            
            <main className='pt-16'>
                <Outlet />
            </main>

            <footer>
                <Footer />
            </footer>
        </>
    );
};

export default RootLayout;
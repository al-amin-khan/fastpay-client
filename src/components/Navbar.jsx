import { Link, NavLink, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';
import Loading from './Loading';
import toast from 'react-hot-toast';
import fastPayLogo from '../assets/fastpay.png';
import { FaRegCircleUser } from 'react-icons/fa6';

const Navbar = () => {
    const navItems = [
        { id: 1, name: "Home", link: "/", protected: false },
        { id: 2, name: "Bills", link: "/bills", protected: false },
        { id: 3, name: "My Pay Bills", link: "/my-bills", protected: true },
    ]

    const { loading, user, logOut } = useAuth();

    const location = useLocation();
    const isLoginPage = location.pathname === '/auth/login';
    const isRegisterPage = location.pathname === '/auth/register';

    if (loading) {
        return <Loading />
    }

    const visibleNavItems = navItems.filter(item => !item.protected || (item.protected && user));

    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast.success('You have successfully logged out.', {
                    duration: 3000,
                    position: 'bottom-left',
                });
            })
            .catch((error) => {
                toast.error(`Error: ${error.message}`, {
                    duration: 4000,
                    position: 'bottom-left',
                });
            });
    };

    return (
        <div className="navbar bg-base-100 shadow-sm font-inter">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow font-semibold">
                        {
                            visibleNavItems.map(item => (
                                <li key={item.id}>
                                    <NavLink to={item.link}
                                        className={({ isActive }) => isActive ? 'active underline underline-offset-5 decoration-green-600 decoration-2' : ''}
                                    >
                                        {item.name}
                                    </NavLink>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost text-xl">
                    <img src={fastPayLogo} alt="fastPay Logo" className="h-10 md:h-12 lg:h-12" />
                </Link>
            </div>
            <div className="navbar-end hidden lg:flex">
                <ul className="menu menu-horizontal px-1 font-semibold">
                    {
                        visibleNavItems.map(item => (
                            <li key={item.id}>
                                <NavLink to={item.link}
                                    className={({ isActive }) => isActive ? 'active underline underline-offset-5 decoration-green-600 decoration-2' : ''}
                                >
                                    {item.name}
                                </NavLink>
                            </li>
                        ))
                    }
                </ul>
                <div className='flex items-center justify-center space-x-1.5 text-gray-500'>
                    {
                        user ?
                            (
                                <>
                                    <div className="font-normal">Welcome, {user.displayName}</div>
                                    <div className="space-x-1.5">
                                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                            <div className="w-10 rounded-full">
                                                {
                                                    user ?
                                                        <img
                                                            alt={user?.displayName}
                                                            src={user?.photoURL}
                                                            className="w-10"
                                                            referrerPolicy="no-referrer"
                                                        />
                                                        :
                                                        <FaRegCircleUser />
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={handleLogOut} className="btn btn-soft">Logout</button>
                                </>
                            )
                            :
                            isLoginPage ?
                                <Link to="/auth/register" className="btn">Register</Link>
                                :
                                isRegisterPage ?
                                    <Link to="/auth/login" className="btn">Login</Link>
                                    :
                                    (
                                        <>
                                            <Link to="/auth/login" className="btn">Login</Link>
                                            <Link to="/auth/register" className="btn">Register</Link>
                                        </>
                                    )
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;
import { Link, NavLink, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';
import Loading from './Loading';
import toast from 'react-hot-toast';
import fastPayLogo from '../assets/fastpay.png';
import { FaRegCircleUser } from 'react-icons/fa6';
import useTheme from '../hooks/useTheme';
import { BadgeDollarSign, BookA, Home, MessageCircleCode, Moon, ReceiptText, ReceiptTextIcon, Sun } from 'lucide-react';

const Navbar = () => {
    const navItems = [
        { id: 1, name: "Home", link: "/", icon: Home, protected: false },
        { id: 2, name: "Bills", link: "/bills", icon: ReceiptText, protected: false },
        { id: 6, name: "My Pay Bills", link: "/my-bills", icon: ReceiptTextIcon, protected: true },
        { id: 3, name: "About", link: "/about", icon: BookA, protected: false },
        { id: 4, name: "Pricing", link: "/pricing", icon: BadgeDollarSign, protected: false },
        { id: 5, name: "Support", link: "/support", icon: MessageCircleCode, protected: false },
    ]

    const { loading, user, logOut } = useAuth();
    const { theme, toggle } = useTheme();

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
        <div className="w-11/12 mx-auto navbar bg-base-100 shadow-sm font-inter">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-99999 mt-3 w-52 p-2 px-1 shadow font-semibold">
                        {
                            visibleNavItems.map(item => (
                                <li key={item.id}>
                                    <NavLink to={item.link}
                                        className={({ isActive }) => isActive ? 'active underline underline-offset-5 decoration-primary decoration-3' : ''}
                                    >
                                        {item.name}
                                    </NavLink>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost text-xl">
                    <img src={fastPayLogo} alt="fastPay Logo" className="ml-1.5 md:ml-0 lg:ml-0 h-10 md:h-10 lg:h-12" />
                </Link>
            </div>

            <div className="navbar-center">
                <ul className="menu menu-horizontal px-1 font-semibold">
                    {
                        visibleNavItems.map(item => (
                            <li key={item.id}>
                                <NavLink to={item.link}
                                    className={({ isActive }) => isActive ? 'active underline underline-offset-5 decoration-primary decoration-3' : ''}
                                >
                                    <div className='flex justify-center items-center'>
                                        <item.icon size={18} className='mr-1' />
                                        {item.name}
                                    </div>
                                </NavLink>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="navbar-end hidden lg:flex">
                <div className='flex items-center justify-center space-x-1.5 text-base-content/70'>
                    {
                        user ?
                            (
                                <>
                                    <div className="dropdown dropdown-end">
                                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                            <div className="w-12 rounded-full border-2 border-[#3fa743]">
                                                {
                                                    user && user.photoURL ?
                                                        <img
                                                            alt={user.displayName}
                                                            src={user.photoURL}
                                                            className="w-10"
                                                            referrerPolicy="no-referrer"
                                                        />
                                                        :
                                                        <div className="flex justify-center items-center rounded-full h-10 w-10 overflow-hidden">
                                                            <FaRegCircleUser size={30} color='#3fa743' />
                                                        </div>
                                                }
                                            </div>
                                        </div>
                                        <ul
                                            tabIndex={0}
                                            className="menu menu-sm dropdown-content mt-3 w-56 rounded-box bg-base-100 p-2 shadow"
                                        >
                                            <li className="px-2 py-1 text-sm text-base-content/70">
                                                Welcome,
                                                <p className="px-0 font-medium text-base-content">{user.displayName}</p>
                                            </li>
                                            <li>
                                                <div className='flex justify-center items-center'>
                                                    <button onClick={handleLogOut} className="btn btn-soft btn-sm py-3">
                                                        Logout
                                                    </button>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
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
                    {/* theme toggle*/}
                    <button
                        aria-label="Toggle theme"
                        onClick={toggle}
                        className={`btn btn-ghost btn-sm ${theme === "light" ? "text-base-content/70" : "bg-base-200 text-base-content"}`}
                    >
                        {theme === "light" ? <Sun size={22} className="text-warning" /> : <Moon size={22} className="text-warning/80" />}
                        <span className="ml-1 hidden sm:inline">
                            {theme === "light" ? "Light" : "Dark"}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;

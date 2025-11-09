import React from 'react';
import { Link, NavLink } from 'react-router';

const Navbar = () => {
    const navItems = [
        { id: 1, name: "Home", link: "/" },
        { id: 2, name: "Bills", link: "/bills" },
        { id: 3, name: "My Pay Bills", link: "/my-bills" },
    ]

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
                            navItems.map(item => (
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
                <a className="btn btn-ghost text-xl">daisyUI</a>
            </div>
            <div className="navbar-end hidden lg:flex">
                <ul className="menu menu-horizontal px-1 font-semibold">
                    {
                        navItems.map(item => (
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
                    <div className="font-normal">Welcome, Al Amin Khan</div>
                    <div className="space-x-1.5">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                        <Link to="/auth/login" className="btn">Login</Link>
                        <Link to="/auth/register" className="btn">Register</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
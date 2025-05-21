import React, { useEffect, useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { Logo } from '../index'
import { useSelector } from 'react-redux';
import UserBadge from './UserBadge';
import { BrainIcon, BrainCircuitIcon } from 'lucide-react';

const themes = ['light', 'dark', 'cupcake', 'bumblebee', 'emerald', 'corporate', 'synthwave', 'retro', 'cyberpunk', 'valentine', 'haloween', 'garden', 'forest', 'aqua', 'lofi', 'pastel', 'fantasy', 'wireframe', 'black', 'luxury', 'dracula', 'cmyk', 'autumn', 'business', 'acid', 'lemonade', 'night', 'coffee', 'winter', 'dim', 'nord', 'sunset', 'caramellatte', 'abyss', 'silk'];

const Header = () => {

    const authStatus = useSelector(state => state.auth.status);

    const navigate = useNavigate();

    const [menubar, setMenubar] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const navItems = [
        {
            name: 'Home',
            slug: '/',
            active: true
        },
        {
            name: 'Messages',
            slug: '/chatbot',
            active: authStatus,
        },
        {
            name: 'About',
            slug: '/about',
            active: true
        },
        {
            name: 'Contact',
            slug: '/contact',
            active: true
        },
        // {
        //     name: 'Login',
        //     slug: '/login',
        //     // active: !authStatus
        //     active: true
        // },
        {
            name: 'Register',
            slug: '/register',
            active: !authStatus,
        },

    ];

    return (
        <header className='w-full bg-gray-900/10 backdrop-blur-sm shadow-black/30 shadow-2xl sticky top-0 z-50'>
            <nav className='max-w-7xl mx-auto px-4 py-4 flex justify-between items-center'>
                {/* Logo */}
                <div onClick={() => navigate('/')} className='max-w-[100px]' title='neuroAI | Home'>
                    <Logo width='100%' />
                </div>

                {authStatus && <UserBadge />}

                {/* Theme Dropdown (Mobile & Tablet) */}
                <div className='dropdown dropdown-center md:hidden' title='Themes'>
                    <div tabIndex={0} role='button' className='btn btn-ghost'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                        </svg>

                        <svg
                            width='12px'
                            height='12px'
                            className='inline-block h-2 w-2 fill-current opacity-60'
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 2048 2048'
                        >
                            <path d='M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z'></path>
                        </svg>
                    </div>
                    <ul tabIndex={0} className='dropdown-content h-60 overflow-auto bg-base-300/90 rounded-box p-2 shadow-2xl'>
                        {themes.map((t) => (
                            <li key={t}>
                                <input
                                    type='radio'
                                    name='theme-dropdown'
                                    className={`theme-controller w-full btn btn-sm btn-ghost justify-start ${theme === t ? 'underline underline-offset-4' : ''}`}
                                    aria-label={t.charAt(0).toUpperCase() + t.slice(1)}
                                    value={t}
                                    checked={theme === t}
                                    onChange={() => setTheme(t)}
                                    title={t.charAt(0).toUpperCase() + t.slice(1)}
                                />
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Desktop Navigation */}
                <ul className='hidden md:flex space-x-6'>
                    {navItems.map(({ name, slug, active }) =>
                        active ? (
                            <li key={slug}>
                                <NavLink
                                    to={slug}
                                    title={name}
                                    className={({ isActive }) =>
                                        `btn btn-block btn-ghost transition ${isActive ? 'bg-base-300 underline underline-offset-4' : 'hover:underline hover:underline-offset-4'}`}
                                >
                                    {name}
                                </NavLink>
                            </li>
                        ) : null
                    )}
                    {/* {authStatus && (
                        <li>
                            <LogoutBtn />
                        </li>
                    )} */}
                </ul>

                {/* Desktop Theme Dropdown (Right Side) */}
                <div className='dropdown dropdown-center hidden md:block' title='Themes'>
                    <div tabIndex={0} role='button' className='btn btn-ghost'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                        </svg>

                        <svg
                            width='12px'
                            height='12px'
                            className='inline-block h-2 w-2 fill-current opacity-60'
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 2048 2048'
                        >
                            <path d='M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z'></path>
                        </svg>
                    </div>
                    <ul tabIndex={0} className='dropdown-content h-60 overflow-auto bg-base-300/90 rounded-box w-40 p-2 shadow-2xl'>
                        {themes.map((t) => (
                            <li key={t}>
                                <input
                                    type='radio'
                                    name='theme-dropdown'
                                    className={`theme-controller w-full btn btn-sm btn-ghost justify-start ${theme === t ? 'underline underline-offset-4' : ''}`}
                                    aria-label={t.charAt(0).toUpperCase() + t.slice(1)}
                                    value={t}
                                    checked={theme === t}
                                    onChange={() => setTheme(t)}
                                    title={t.charAt(0).toUpperCase() + t.slice(1)}
                                />
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className='md:hidden focus:outline-none cursor-pointer'
                    onClick={() => setMenubar(!menubar)}
                    aria-expanded={menubar}
                    aria-label='Toggle Menu'
                >
                    {menubar ?
                        (<BrainCircuitIcon size={25} />)
                        :
                        (<BrainIcon size={25} className='animate-spin' />)
                    }
                </button>
            </nav>

            {/* Mobile Dropdown */}
            <ul className={`md:hidden bg-gray-900/10 backdrop-blur-3xl transition-all px-2 duration-300 ${menubar ? 'block' : 'hidden'}`}>
                {navItems.map(({ name, slug, active }) =>
                    active ? (
                        <li key={slug}>
                            <NavLink
                                to={slug}
                                title={name}
                                className={({ isActive }) =>
                                    `btn btn-block btn-ghost my-2 text-center transition ${isActive ? 'bg-base-300' : ''
                                    }`
                                }
                                onClick={() => setMenubar(false)}
                            >
                                {name}
                            </NavLink>
                        </li>
                    ) : null
                )}
                {/* {authStatus && (
                    <li className='text-center'>
                        <LogoutBtn />
                    </li>
                )} */}
            </ul>
        </header>
    )
}

export default Header
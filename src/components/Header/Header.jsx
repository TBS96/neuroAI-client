import React, { useEffect, useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { Logo } from '../index'
import { useSelector } from 'react-redux';
import UserBadge from './UserBadge';
import { BrainIcon, BrainCircuitIcon, Notebook, House, BadgeInfo, Contact, Sun, MoonStar, ChevronDown } from 'lucide-react';

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
            active: true,
            icon: (<House size={20} className='transition-all duration-300 group-hover:-translate-x-2' />),
        },
        {
            name: 'Messages',
            slug: '/chatbot',
            active: authStatus,
            icon: (<House size={20} className='transition-all duration-300 group-hover:-translate-x-2' />)
        },
        {
            name: 'About',
            slug: '/about',
            active: true,
            icon: (<BadgeInfo size={20} className='transition-all duration-300 group-hover:-translate-x-2' />)
        },
        {
            name: 'Contact',
            slug: '/contact',
            active: true,
            icon: (<Contact size={20} className='transition-all duration-300 group-hover:-translate-x-2' />)
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
            icon: (<Notebook size={20} className='transition-all duration-300 group-hover:-translate-x-2' />)
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
                    <div tabIndex={0} role='button' className='btn btn-ghost transition-all duration-300 hover:rotate-5'>
                        <MoonStar size={20} />
                        <ChevronDown size={20} />
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
                    {navItems.map(({ name, slug, active, icon }) =>
                        active ? (
                            <li key={slug}>
                                <NavLink
                                    to={slug}
                                    title={name}
                                    className={({ isActive }) =>
                                        `btn btn-block btn-ghost group flex items-center gap-2 transition ${isActive ? 'bg-base-300 underline underline-offset-4' : 'hover:underline hover:underline-offset-4'}`}
                                >
                                    {icon} {name}
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
                    <div tabIndex={0} role='button' className='btn btn-ghost transition-all duration-300 hover:rotate-5'>
                        <Sun size={20} className='transition-all duration-300 hover:rotate-180' />

                        <ChevronDown size={20} />
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
                    className='md:hidden focus:outline-none cursor-pointer transition-all duration-300 hover:rotate-30'
                    onClick={() => setMenubar(!menubar)}
                    aria-expanded={menubar}
                    aria-label='Toggle Menu'
                >
                    {menubar ?
                        (<BrainCircuitIcon size={25} />)
                        :
                        (<BrainIcon size={25} />)
                    }
                </button>
            </nav>

            {/* Mobile Dropdown */}
            <ul className={`md:hidden bg-gray-900/10 backdrop-blur-3xl transition-all px-2 duration-300 ${menubar ? 'block' : 'hidden'}`}>
                {navItems.map(({ name, slug, active, icon }) =>
                    active ? (
                        <li key={slug}>
                            <NavLink
                                to={slug}
                                title={name}
                                className={({ isActive }) =>
                                    `btn btn-block btn-ghost group flex items-center gap-2 my-2 text-center transition ${isActive ? 'bg-base-300' : ''
                                    }`
                                }
                                onClick={() => setMenubar(false)}
                            >
                                {name} {icon}
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
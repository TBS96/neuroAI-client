import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Logo from '../Logo';

function Header() {

    const navigate = useNavigate();

    const location = useLocation();

    const [menubar, setMenubar] = useState(false);

    const navItems = [
        {
            name: 'Home',
            slug: '/',
            active: true
        },
        {
            name: 'Contact',
            slug: '/contact',
            active: true
        },
        {
            name: 'About',
            slug: '/about',
            active: true
        },
        {
            name: 'Login',
            slug: '/login',
            // active: !authStatus
            active: true
        },
        {
            name: 'Signup',
            slug: '/signup',
            // active: !authStatus
            active: true
        },
    ];

    return (
        <header className='py-1 shadow-2xl shadow-slate-600 bg-blue-900 border-b border-gray-100 backdrop-blur-lg bg-opacity-30 text-white dark:text-gray-200 sticky top-0 z-50'>
            <nav className='flex items-center justify-between max-w-7xl mx-auto px-4'>
                <div className='mr-4'>
                    <Link>
                        <Logo width='100%' />
                    </Link>
                </div>
                <button onClick={() => setMenubar(!menubar)} className='btn btn-circle skeleton md:hidden'>
                    {menubar ? '✘' : '︾'}
                </button>
                <ul className={`absolute md:relative top-[72px] left-0 md:top-0 md:left-auto shadow-2xl shadow-slate-600 md:shadow-none bg-blue-900/80 glass md:bg-none backdrop-blur-lg md:backdrop-blur-none border-b md:border-none border-gray-100 md:bg-transparent w-full md:w-auto flex flex-col md:flex-row items-center md:items-center space-y-4 md:space-y-0 md:space-x-6 px-4 py-4 md:px-0 md:py-0 z-50 transition-all duration-300 ${menubar ? 'block' : 'hidden md:flex'}`}>
                    {navItems.map((item) => 
                        item.active ? (
                            <li key={item.name} className={`w-full md:w-auto ${location.pathname === item.slug ? 'bg-black rounded-full' : ''}`}>
                                <button onClick={() => navigate(item.slug)} className='btn btn-ghost w-full md:w-auto text-left md:text-center hover:bg-primary px-6 py-2 duration-200 rounded-full'>{item.name}</button>
                            </li>
                        ) : null
                    )}
                </ul>
            </nav>
        </header>
    )
}

export default Header
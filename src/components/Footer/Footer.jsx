import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Logo } from '../index'
import { Facebook, Github, Linkedin, Mail } from 'lucide-react'
import { BsTwitterX } from 'react-icons/bs'
import { useFooterVisibility } from '../../context/FooterVisibilityContext'

function Footer() {

    const { showFooter } = useFooterVisibility();

    if (!showFooter) return null;

    const navigate = useNavigate();

    const additionalLinks = [
        {
            title: 'Quick Links',
            links: [
                {
                    name: 'Features',
                    url: '#',
                },
                {
                    name: 'How It Works',
                    url: '#',
                },
                {
                    name: 'Testimonials',
                    url: '#',
                },
            ],
        },
        {
            title: 'Company',
            links: [
                {
                    name: 'About Us',
                    url: '/about',
                },
                {
                    name: 'Remedy',
                    url: '/chatbot',
                },
                {
                    name: 'Contact',
                    url: '/contact',
                },
            ],
        },
        {
            title: 'Legal',
            links: [
                {
                    name: 'Privacy Policy',
                    url: '/',
                },
                {
                    name: 'Terms of Service',
                    url: '/',
                },
                {
                    name: 'Cookie Policy',
                    url: '/',
                },
            ],
        },
    ];

    const footerLinks = [
        {
            title: 'Social',
            links: [
                {
                    name: 'GitHub',
                    path: 'https://github.com/tbs96',
                    icon: (
                        <Github />
                    ),
                    btnColorClassName: 'btn-neutral',
                },
                {
                    name: 'LinkedIn',
                    path: 'https://www.linkedin.com/in/prantikghosh96/',
                    icon: (
                        <Linkedin />
                    ),
                    btnColorClassName: 'btn-info',
                },
                {
                    name: 'Email',
                    path: 'mailto:9tbs6@proton.me',
                    icon: (
                        <Mail />
                    ),
                    btnColorClassName: 'btn-warning',
                },
                {
                    name: 'X',
                    path: 'https://x.com/9theblacksheep6',
                    icon: (
                        <BsTwitterX size={25} />
                    ),
                    btnColorClassName: 'btn-neutral',
                },
                {
                    name: 'Facebook',
                    path: 'https://www.facebook.com/theblacksheep96/',
                    icon: (
                        <Facebook />
                    ),
                    btnColorClassName: 'btn-primary'
                },
            ],
        },
    ];

    const teamMembers = [
        {
            name: 'Mahvish Ruhi',
            url: 'https://github.com/Mahvish16',
            className: 'btn btn-ghost btn-block btn-secondary hover:underline underline-offset-4 decoration-error',
        },
        {
            name: 'Sayan Bhattacharya',
            url: 'https://github.com/Sayan-ezioo',
            className: 'btn btn-ghost btn-block btn-success hover:underline underline-offset-4 decoration-violet-500',
        },
        {
            name: 'Prantik Ghosh',
            url: 'https://github.com/tbs96',
            className: 'btn btn-ghost btn-block btn-primary hover:underline underline-offset-4 decoration-amber-500',
        },
        {
            name: 'Sanchita Kar',
            url: 'https://github.com/',
            className: 'btn btn-ghost btn-block btn-warning hover:underline underline-offset-4 decoration-pink-500',
        },
        {
            name: 'Arghyakamal Ghosh',
            url: 'https://github.com/',
            className: 'btn btn-ghost btn-block btn-info hover:underline underline-offset-4 decoration-green-500',
        },
    ];

    return (
        <footer className='bg-slate-900/60 backdrop-blur-sm py-10 border-t-2 border-t-gray-700 rounded-t-4xl' data-aos='fade-up'>
            <div className='container mx-auto px-4'>

                {/* Upper Footer */}
                <div className='flex flex-wrap justify-between items-center'>
                    {/* Logo */}
                    <div className='max-w-[100px] md:w-1/3 mx-auto md:mx-[120px] pb-8 md:pb-0' onClick={() => navigate('/')} title='neuroAI | Home'>
                        <Logo width='100%' />
                    </div>

                    <div className='border-b md:border-none border-b-gray-700 w-full md:w-0'></div>

                    {/* Footer Sections */}
                    {additionalLinks.map(({links, title}, index) => (
                        <div key={index} className='w-full md:w-auto text-center'>
                            <h3 className='font-semibold text-lg text-gray-400 uppercase my-4 md:my-0'>{title}</h3>
                            <ul className='mt-2'>
                                {links.map(({name, url}, idx) => (
                                    <li key={idx} title={name} className='mt-1 hover:underline underline-offset-4 hover:translate-x-2 transition-all duration-300'>
                                        <Link to={url}>
                                            {name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className='mt-8 text-center border-t border-t-gray-700 pt-4 text-sm'></div>

                {/* Social Links */}
                <div className='flex flex-wrap justify-center mt-8'>
                    {footerLinks.map(({links, title}) => (
                        <div key={title} className='text-center'>
                            <h3 className='text-gray-400 uppercase font-semibold mb-4'>
                                {title}
                            </h3>
                            <ul className='md:flex justify-center'>
                                {links.map(({name, path, icon, btnColorClassName}) => (
                                    <li key={name} className='p-4' title={name}>
                                        <Link
                                            to={path}
                                            className={`btn btn-soft ${btnColorClassName} hover:translate-x-1 hover:-translate-y-1 duration-200 transition-all ease-in-out`}
                                            target='_blank'
                                        >
                                            {icon}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Lower Footer */}
                <div className='mt-8 text-center border-t border-t-gray-700 pt-4 text-sm'>
                    <div>
                        &copy; {new Date().getFullYear()}{' '}
                        <Link to='/' className='text-primary transition-all duration-200 hover:link font-medium' title='neuroAI | Home'>
                            neuroAI
                        </Link>{' '}
                        | All Rights Reserved by{' '}
                        {teamMembers.map(({name, url, className}, index) => (
                            <div className='flex md:inline-flex justify-center' key={index} title={name}>
                                <Link
                                    to={url}
                                    className={className}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    {name}
                                </Link>
                                {index < teamMembers.length - 1 && ' '}
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className='my-4 border border-gray-700'></div>
                <p className='mt-1 text-xs italic text-center'>
                    Crafted with care by <span className='font-semibold text-accent hover:link'>
                        <Link to={teamMembers[2].url} title={teamMembers[2].name}>
                            {teamMembers[2].name}
                        </Link>
                    </span>
                </p>
            </div>
        </footer>
    )
}

export default Footer
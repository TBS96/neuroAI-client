import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Logo } from '../index'

function Footer() {

    const navigate = useNavigate();

    const additionalLinks = [
        {
            title: 'Quick Links',
            links: ['Features', 'How It Works', 'Testimonials'],
        },
        {
            title: 'Company',
            links: ['About Us', 'Remedy', 'Contact'],
        },
        {
            title: 'Legal',
            links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
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
                        <svg
                            className='fill-current'
                            aria-hidden='true'
                            xmlns='http://www.w3.org/2000/svg'
                            width='24'
                            height='24'
                            fill='currentColor'
                            viewBox='0 0 24 24'
                        >
                            <path
                                fillRule='evenodd'
                                d='M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z'
                                clipRule='evenodd'
                            />
                        </svg>
                    ),
                    btnColorClassName: 'btn-neutral',
                },
                {
                    name: 'LinkedIn',
                    path: 'https://www.linkedin.com/in/prantikghosh96/',
                    icon: (<svg className='fill-current' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' viewBox='0 0 24 24'>
                        <path fillRule='evenodd' d='M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z' clipRule='evenodd' />
                        <path d='M7.2 8.809H4V19.5h3.2V8.809Z' />
                    </svg>),
                    btnColorClassName: 'btn-info',
                },
                {
                    name: 'Email',
                    path: 'mailto:9tbs6@proton.me',
                    icon: (<svg className='fill-current' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' viewBox='0 0 24 24'>
                        <path d='M17 6h-2V5h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2h-.541A5.965 5.965 0 0 1 14 10v4a1 1 0 1 1-2 0v-4c0-2.206-1.794-4-4-4-.075 0-.148.012-.22.028C7.686 6.022 7.596 6 7.5 6A4.505 4.505 0 0 0 3 10.5V16a1 1 0 0 0 1 1h7v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3h5a1 1 0 0 0 1-1v-6c0-2.206-1.794-4-4-4Zm-9 8.5H7a1 1 0 1 1 0-2h1a1 1 0 1 1 0 2Z' />
                    </svg>),
                    btnColorClassName: 'btn-warning',
                },
                {
                    name: 'X',
                    path: 'https://x.com/9theblacksheep6',
                    icon: (<svg className='fill-current' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' viewBox='0 0 24 24'>
                        <path d='M13.795 10.533 20.68 2h-3.073l-5.255 6.517L7.69 2H1l7.806 10.91L1.47 22h3.074l5.705-7.07L15.31 22H22l-8.205-11.467Zm-2.38 2.95L9.97 11.464 4.36 3.627h2.31l4.528 6.317 1.443 2.02 6.018 8.409h-2.31l-4.934-6.89Z' />
                    </svg>),
                    btnColorClassName: 'btn-neutral',
                },
                {
                    name: 'Facebook',
                    path: 'https://www.facebook.com/theblacksheep96/',
                    icon: (<svg className='fill-current' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' viewBox='0 0 24 24'>
                        <path fillRule='evenodd' d='M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z' clipRule='evenodd' />
                    </svg>),
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
        <footer className='bg-slate-900/60 backdrop-blur-sm py-10 border-t-2 border-t-gray-700 rounded-t-4xl'>
            <div className='container mx-auto px-4'>

                {/* Upper Footer */}
                <div className='flex flex-wrap justify-between items-center'>
                    {/* Logo */}
                    <div className='max-w-[100px] md:w-1/3 mx-auto md:mx-[120px] pb-8 md:pb-0' onClick={() => navigate('/')}>
                        <Logo width='100%' />
                    </div>

                    <div className='border-b md:border-none border-b-gray-700 w-full md:w-0'></div>

                    {/* Footer Sections */}
                    {additionalLinks.map(({links, title}, index) => (
                        <div key={index} className='w-full md:w-auto text-center'>
                            <h3 className='font-semibold text-lg text-gray-400 uppercase my-4 md:my-0'>{title}</h3>
                            <ul className='mt-2'>
                                {links.map((link, idx) => (
                                    <li key={idx} className='mt-1 hover:underline underline-offset-4 hover:translate-x-2 transition-all duration-300'>
                                        <Link to='/'>
                                            {link}
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
                                    <li key={name} className='p-4'>
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
                        <Link to='/' className='text-primary transition-all duration-200 hover:link font-medium'>
                            neuroAI
                        </Link>{' '}
                        | All Rights Reserved by{' '}
                        {teamMembers.map((member, index) => (
                            <div className='flex md:inline-flex justify-center' key={index}>
                                <Link
                                    to={member.url}
                                    className={member.className}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    {member.name}
                                </Link>
                                {index < teamMembers.length - 1 && ' '}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
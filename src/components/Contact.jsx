import React from 'react'
import { Link } from 'react-router-dom'
import { Github, Mail } from 'lucide-react'

const teamMembers = [
    {
        name: 'Mahvish Ruhi',
        roll: '2300012xxxx, CSE',
        role: 'Backend Developer (Lead)',
        github: 'https://github.com/Mahvish16',
        mail: 'mailto:mahvish@gmail.com',
        color: 'bg-error/60',
        image: 'https://avatars.githubusercontent.com/u/122742962?v=4',
    },
    {
        name: 'Sayan Bhattacharya',
        roll: '23000122060, CSE',
        role: 'Backend Developer',
        github: 'https://github.com/Sayan-ezioo',
        mail: 'mailto:bhattacharyasayan6@gmail.com',
        color: 'bg-info/60',
        image: 'https://i.ibb.co/GfKGZFHx/SayanB.jpg',
    },
    {
        name: 'Prantik Ghosh',
        roll: '23000122059, CSE',
        role: 'Frontend Developer (Lead)',
        github: 'https://github.com/tbs96',
        mail: 'mailto:prantik.fdev@gmail.com',
        color: 'bg-success/60',
        image: 'https://lh3.googleusercontent.com/a/ACg8ocLc5XweJ3t9A0OYSdZszCy1-48CxzFE_J693kzm6Vsn4X8HsnS6=s288-c-no',
    },
    {
        name: 'Sanchita Kar',
        roll: '2300012xxxx, CSE',
        role: 'Frontend Developer',
        github: 'https://github.com/',
        mail: 'mailto:sanchita@gmail.com',
        color: 'bg-warning/60',
        image: 'https://i.ibb.co/RTLwtGB/sanchita.png',
    },
    {
        name: 'Arghyakamal Ghosh',
        roll: '2300012xxxx, CSE',
        role: 'Documentation Engineer',
        github: 'https://github.com/',
        mail: 'mailto:arghyakamal@gmail.com',
        color: 'bg-info/60',
        image: 'https://i.ibb.co/S4yJ8wCK/Arghyakamal-G.jpg',
    },
];

const Contact = () => {
    return (
        <section
            className='hero min-h-screen hover:shadow-2xl transition-all duration-300 ease-in-out mb-12 rounded'
            style={{ backgroundImage: "url('https://i.ibb.co/rRgGYCvy/contact.png')" }}
        >
            <div className='hero-overlay'></div>
            <div className='hero-content'>
                <div className='container mx-auto px-6 sm:px-12'>
                    <h1 className='text-4xl md:text-6xl font-bold text-center'>Meet Our Team</h1>
                    <p className='mt-4 text-base-200 text-center font-semibold'>
                        Dedicated professionals working together to build great experiences.
                    </p>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8'>
                        {teamMembers.map(({ github, image, name, role, roll, mail }, index) => (
                            <div
                                key={index}
                                className={`group p-6 rounded-lg shadow-lg skeleton hover:shadow-2xl hover:translate-x-1 hover:-translate-y-1 transition-all duration-300 ease-in-out`}
                            >
                                <div className='flex items-center space-x-4'>
                                    <img
                                        src={image}
                                        alt={name}
                                        className='size-24 border-r-4 rounded-r-full pr-2 pt-2 pb-2 object-cover'
                                    />
                                    <div>
                                        <h3 className='text-xl font-extrabold text-accent'>
                                            {name}
                                        </h3>
                                        <p className='text-sm font-medium'>
                                            {roll}
                                        </p>
                                        <p className='mt-2 font-bold text-info'>
                                            {role}
                                        </p>
                                    </div>
                                </div>
                                <div className='flex justify-center items-center gap-5'>
                                    <Link
                                        to={github}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='mt-4 inline-block opacity-0 group-hover:opacity-100 transition-opacity'
                                    >
                                        {<Github size={20} className='text-primary hover:text-success' />}
                                    </Link>
                                    <Link
                                        to={mail}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='mt-4 inline-block opacity-0 group-hover:opacity-100 transition-opacity'
                                    >
                                        {<Mail size={20} className='text-success hover:text-primary' />}
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact
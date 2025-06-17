import React from 'react'
import { Link } from 'react-router-dom'
import { Github, Mail } from 'lucide-react'

const teamMembers = [
    {
        name: 'Sayan Bhattacharya',
        role: 'Backend Developer',
        github: 'https://github.com/Sayan-ezioo',
        mail: 'mailto:bhattacharyasayan6@gmail.com',
        color: 'bg-info/60',
        image: 'https://i.ibb.co/GfKGZFHx/SayanB.jpg',
    },
    {
        name: 'Prantik Ghosh',
        role: 'Frontend Developer',
        github: 'https://github.com/tbs96',
        mail: 'mailto:prantik.fdev@gmail.com',
        color: 'bg-success/60',
        image: 'https://i.ibb.co/PzVThCGG/PrantiKG.jpg',
    },
    {
        name: 'Mahvish Ruhi',
        role: 'Backend Developer',
        github: 'https://github.com/Mahvish16',
        mail: 'mailto:mahvish.ruhi@gmail.com',
        color: 'bg-error/60',
        image: 'https://avatars.githubusercontent.com/u/122742962?v=4',
    },
    {
        name: 'Arghyakamal Ghosh',
        role: 'Q/A Engineer',
        github: 'https://github.com/',
        mail: 'mailto:arghyakamalghosh19@gmail.com',
        color: 'bg-info/60',
        image: 'https://i.ibb.co/S4yJ8wCK/Arghyakamal-G.jpg',
    },
    {
        name: 'Sanchita Kar',
        role: 'Documentation Engineer',
        github: 'https://github.com/',
        mail: 'mailto:karsanchita50@gmail.com',
        color: 'bg-warning/60',
        image: 'https://i.ibb.co/RTLwtGB/sanchita.png',
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
                    <h1 className='text-4xl md:text-6xl font-bold text-center mt-5 md:mt-0' data-aos='fade-up' data-aos-delay='700'>Meet Our Team</h1>
                    <p className='mt-4 text-base-200 text-center font-semibold' data-aos='fade-right' data-aos-delay='1000'>
                        Dedicated professionals working together to build great experiences.
                    </p>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8'>
                        {teamMembers.map(({ github, image, name, role, mail }, index) => {
                            const aos = index === 0 ? 'fade-down' : index === 1 ? 'zoom-in' : index === 2 ? 'zoom-in-right' : index === 3 ? 'zoom-out' : 'flip-down';
                            const aosDuration = index === 1 ? '1500' : '1100';
                            return (
                                <div key={index} data-aos={aos} data-aos-delay='700' data-aos-duration={aosDuration} className='tooltip' data-tip={name}>
                                    <div className={`group p-6 rounded-lg shadow-lg skeleton hover:shadow-2xl hover:translate-x-1 hover:-translate-y-1 transition-all duration-300 ease-in-out`}>
                                        <div className='flex items-center space-x-4'>
                                            <img
                                                src={image}
                                                alt={name}
                                                className='size-24 border-r-4 rounded-r-full pr-2 pt-2 pb-2 object-cover'
                                                data-aos='fade-down'
                                                data-aos-delay='700'
                                                loading='lazy'
                                            />
                                            <div data-aos='fade-up' data-aos-delay='700'>
                                                <h3 className='text-xl font-extrabold text-accent'>
                                                    {name}
                                                </h3>
                                                <p className='mt-2 font-bold text-info'>
                                                    {role}
                                                </p>
                                            </div>
                                        </div>
                                        <div className='flex justify-center items-center gap-5'>
                                            <Link
                                                to={github}
                                                target='_blank'
                                                title={github}
                                                rel='noopener noreferrer'
                                                className='mt-4 inline-block opacity-0 group-hover:opacity-100 transition-opacity'
                                            >
                                                {<Github size={20} className='text-primary hover:text-success' />}
                                            </Link>
                                            <Link
                                                to={mail}
                                                target='_blank'
                                                title={mail}
                                                rel='noopener noreferrer'
                                                className='mt-4 inline-block opacity-0 group-hover:opacity-100 transition-opacity'
                                            >
                                                {<Mail size={20} className='text-success hover:text-primary' />}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact
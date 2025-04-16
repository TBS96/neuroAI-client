import React from 'react'
import { Link } from 'react-router-dom'

const HowItWorksSection = () => {
    return (
        <>
            <section className='py-16 my-16 rounded-xl bg-white/10 hover:shadow-2xl transition-all duration-300 ease-in-out'>
                <div className='container mx-auto px-6 md:px-12 text-center'>
                    <h2 className='text-3xl md:text-4xl font-semibold' data-aos='fade-right'>How It Works</h2>
                    <div className='mt-12 grid gap-8 md:grid-cols-3'>
                        {[
                            {
                                number: '1',
                                title: 'Sign Up',
                                desc: 'Create your account and complete a brief assessment.',
                                link: '/signup',
                            },
                            {
                                number: '2',
                                title: 'Test Now!',
                                desc: 'Test to get a better mental health with our chatbot',
                                link: '/chatbot',
                            },
                            {
                                number: '3',
                                title: 'Get Result',
                                desc: 'Get to know about your concerns towards better mental health.',
                                link: '/',
                            },
                        ].map(({ number, title, desc, link }, index) => {
                            const aos = index === 0 ? 'fade-up' : index === 1 ? 'zoom-in' : 'flip-up'
                            return (
                                <div key={index} data-aos={aos} data-aos-delay={index * 200}>
                                    <div className='flex flex-col items-center bg-base-300 p-6 rounded-md shadow-md hover:shadow-2xl transition-all duration-300 hover:translate-x-4 hover:cursor-pointer'>
                                        <Link to={link} className='block w-full'>
                                            <div className='text-4xl font-bold bg-base-100 glass w-16 h-16 flex items-center justify-center rounded-full mb-4 mx-auto'>
                                                {number}
                                            </div>
                                            <h3 className='text-2xl font-extrabold'>{title}</h3>
                                            <p className='mt-2 text-gray-600 font-bold'>{desc}</p>
                                        </Link>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        </>
    )
}

export default HowItWorksSection
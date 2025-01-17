import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/index'

const Home = () => {
    return (
        <main>
            {/* Hero Section */}
            <section
                className='relative h-[100vh] bg-cover bg-no-repeat bg-center flex items-center justify-center'
                style={{ backgroundImage: "url('https://i.ibb.co/3kq40pK/home-hero.jpg')" }}>
                <div className='text-center px-6 md:px-12'>
                    <h1 className='bg-clip-text text-transparent bg-gradient-to-r from-[#14b8a6] to-[#7520e4] text-4xl md:text-6xl font-bold'>
                        Mental Health Starts with You
                    </h1>
                    <p className='mt-4 text-gray-700 text-lg font-bold md:text-xl'>
                        Neuro AI supports you on your journey toward better mental health.
                    </p>
                    <div className='mt-6'>
                        <Link to='/chatbot'>
                            <Button className='bg-[#14b8a6] text-white font-medium text-lg shadow-md hover:bg-[#128a7d] transition duration-300'>
                                TEST YOUR MENTAL HEALTH NOW!
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className='py-16 bg-gray-100' id='features'>
                <div className='container mx-auto px-6 md:px-12 text-center'>
                    <h2 className='text-3xl md:text-4xl font-semibold'>
                        A better way to improve your mental health
                    </h2>
                    <div className='mt-12 grid gap-8 md:grid-cols-3'>
                        {[
                            {
                                img: 'https://i.ibb.co/FBXY7FJ/istockphoto2.jpg%22',
                                title: 'Evidence-based',
                                desc: 'Our approach is grounded in scientific research and proven methodologies.',
                            },
                            {
                                img: 'https://i.ibb.co/DYk6JHT/istockphoto-3.jpg',
                                title: 'Personalized Care',
                                desc: 'Tailored support that adapts to your unique needs and progress.',
                            },
                            {
                                img: 'https://i.ibb.co/qB9ncpV/istockphoto.jpg',
                                title: 'Instant Access',
                                desc: '24/7 support at your fingertips, whenever and wherever you need it.',
                            },
                        ].map((feature, index) => (
                            <div key={index} className='bg-white p-6 shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:cursor-pointer rounded-md text-left'>
                                <img
                                    src={feature.img}
                                    alt={feature.title}
                                    className='w-full h-48 object-cover rounded-md mb-4'
                                />
                                <h3 className='text-2xl font-medium'>{feature.title}</h3>
                                <p className='mt-2 text-gray-600'>{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className='py-16 bg-white'>
                <div className='container mx-auto px-6 md:px-12 text-center'>
                    <h2 className='text-3xl md:text-4xl font-semibold'>How It Works</h2>
                    <div className='mt-12 grid gap-8 md:grid-cols-3'>
                        {[
                            {
                                number: '1',
                                title: 'Sign Up',
                                desc: 'Create your account and complete a brief assessment.',
                            },
                            {
                                number: '2',
                                title: 'Test Now!',
                                desc: 'Test to get a better mental health',
                            },
                            {
                                number: '3',
                                title: 'Get Result',
                                desc: 'Get to know about your concerns towards better mental health.',
                            },
                        ].map((step, index) => (
                            <div key={index} className='flex flex-col items-center bg-gray-100 p-6 rounded-md shadow-md hover:shadow-2xl transition-all duration-300 hover:translate-x-4 hover:cursor-pointer'>
                                <div className='text-4xl font-bold bg-[#14b8a6] text-white w-16 h-16 flex items-center justify-center rounded-full mb-4'>
                                    {step.number}
                                </div>
                                <h3 className='text-2xl font-medium'>{step.title}</h3>
                                <p className='mt-2 text-gray-600'>{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className='py-16 bg-gray-100' id='testimonials'>
                <div className='container mx-auto px-6 md:px-12 text-center'>
                    <h2 className='text-3xl md:text-4xl font-semibold'>
                        What Our Users Say
                    </h2>
                    <div className='mt-12 grid gap-8 md:grid-cols-2'>
                        {[
                            {
                                quote:
                                    'Neuro AI has been a game-changer for my mental health. The personalized approach and constant support have made a real difference in my life.',
                                author: 'Sarah J.',
                                role: 'Neuro AI User',
                            },
                            {
                                quote:
                                    "I was skeptical at first, but Neuro AI exceeded my expectations. It's like having a therapist in your pocket, available whenever you need it.",
                                author: 'Michael T.',
                                role: 'Neuro AI User',
                            },
                        ].map((testimonial, index) => (
                            <div key={index} className='bg-white p-6 shadow-md rounded-md text-left hover:shadow-2xl transition-all duration-300 hover:rotate-2 hover:cursor-pointer'>
                                <p className='italic text-gray-700'>'{testimonial.quote}'</p>
                                <div className='mt-4'>
                                    <h4 className='text-lg font-medium'>{testimonial.author}</h4>
                                    <p className='text-sm text-gray-500'>{testimonial.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </main>
    )
}

export default Home
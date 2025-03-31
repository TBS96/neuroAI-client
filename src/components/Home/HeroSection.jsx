import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../index'

const HeroSection = () => {
    return (
        <>
            <section
                className='hero min-h-screen hover:shadow-2xl transition-all duration-300 ease-in-out'
                style={{ backgroundImage: "url(https://i.ibb.co/3kq40pK/home-hero.jpg)" }}
            >
                <div className='hero-overlay'></div>
                <div className='hero-content'>
                    <div className='text-center px-6 md:px-12'>
                        <h1 className='bg-clip-text text-transparent bg-gradient-to-r from-[#14b82f] to-[#6504e4] text-4xl md:text-6xl font-bold'>
                            Mental Health Starts with You
                        </h1>
                        <p className='mt-4 text-base-300 text-lg font-bold md:text-xl'>
                            Neuro AI supports you on your journey toward better mental health.
                        </p>
                        <div className='mt-6'>
                            <Link to='/chatbot'>
                                <Button className='btn-block btn-primary font-medium md:text-lg capitalize md:uppercase'>
                                    Test your mental health now!
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default HeroSection
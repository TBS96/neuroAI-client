import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../index'
import { Typewriter } from 'react-simple-typewriter'

const HeroSection = () => {
    return (
        <>
            <section
                className='hero rounded-xl min-h-screen hover:shadow-2xl transition-all duration-300 ease-in-out'
                style={{ backgroundImage: "url(https://i.ibb.co/3kq40pK/home-hero.jpg)" }}
            >
                <div className='hero-overlay'></div>
                <div className='hero-content'>
                    <div className='text-center px-6 md:px-12'>
                        <h1 className='text-4xl md:text-5xl font-bold'>Mental Health <span className='bg-clip-text text-transparent bg-gradient-to-r from-[#14b82f] to-[#6504e4] block md:inline-block'>
                            <Typewriter
                                words={['begins', 'grows', 'thrives', 'shines', 'heals', 'matters', 'blooms', 'rises']}
                                loop={Infinity}
                                cursor={true}
                                cursorBlinking={true}
                                typeSpeed={130}
                                delaySpeed={1200}
                                deleteSpeed={70}
                            />_
                        </span>with You!</h1>
                        <p className='mt-4 text-base-300 text-lg font-bold md:text-xl'  data-aos='fade-down' data-aos-delay='700'>
                            Neuro AI supports you on your journey toward better mental health.
                        </p>
                        <div className='mt-6' data-aos='fade-up' data-aos-delay='700'>
                            <Link to='/chatbot'>
                                <Button className='btn-primary font-medium md:text-lg capitalize md:uppercase'>
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
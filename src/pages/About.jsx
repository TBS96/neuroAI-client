import React from 'react'

const About = () => {
    return (
        <div className='bg-cover bg-center bg-no-repeat' style={{ backgroundImage: "url('https://i.ibb.co/h1ms14V/team.png')" }}>

            <section className='flex items-center justify-center min-h-screen text-gray-500 text-center py-16'>
                <div className='px-4'>
                    <h2 className='text-4xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500'>About Neuro AI</h2>
                    <p className='text-lg sm:text-xl'>
                        Revolutionizing Artificial Intelligence through neuro-inspired algorithms.
                    </p>
                </div>
            </section>

            <section className='bg-white bg-opacity-80 py-16'>
                <div className='max-w-6xl mx-auto px-6 md:px-12 lg:px-16'>
                    <h2 className='text-3xl sm:text-4xl font-semibold text-gray-800 text-center mb-8'>Who We Are</h2>
                    <p className='text-gray-700 text-base sm:text-lg text-center mb-12'>
                        Neuro AI is a leading innovator in the field of artificial intelligence, harnessing the power of neural networks to solve complex problems. Our team of experts is dedicated to pushing the boundaries of AI technology and creating solutions that can have a lasting impact on industries and society.
                    </p>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                        <div className='bg-gray-100 glass hover:skeleton hover:backdrop-blur-sm p-6 rounded-lg shadow-md hover:shadow-xl hover:scale-105 duration-200 cursor-pointer'>
                            <h3 className='text-2xl font-semibold text-gray-800 mb-4'>Our Mission</h3>
                            <p className='text-gray-700'>
                                Our mission is to bring AI closer to human-level intelligence, revolutionizing various sectors such as healthcare, finance, and robotics, by creating neuro-inspired algorithms that enhance decision-making processes.
                            </p>
                        </div>

                        <div className='bg-gray-100 glass hover:skeleton hover:backdrop-blur-sm p-6 rounded-lg shadow-md hover:shadow-xl hover:scale-105 duration-200 cursor-pointer'>
                            <h3 className='text-2xl font-semibold text-gray-800 mb-4'>Our Vision</h3>
                            <p className='text-gray-700'>
                                We aim to be at the forefront of AI research, developing technologies that improve the quality of life and contribute to global innovation. Our vision is to create a future where AI complements human potential for greater creativity and productivity.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default About
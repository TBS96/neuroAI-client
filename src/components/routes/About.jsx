import React from 'react'

const About = () => {
    return (
        <div className='w-full'>
            <div
                className='hero min-h-screen bg-cover bg-center flex items-center justify-center text-center hero-overlay'
                style={{ backgroundImage: "url('https://i.ibb.co/h1ms14V/team.png')" }}
            >
                <div className='md:hero-content bg-base-300/90 p-8 rounded-md hover:glass duration-300 transition-all ease-in-out hover:shadow-2xl animate-pulse hover:animate-none mx-4 tooltip' data-tip='neuroAI | Revolutionizing Artificial Intelligence through neuro-inspired algorithms.'>
                    <h2 className='text-4xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500' data-aos='fade-up' data-aos-delay='700'>
                        neuroAI
                    </h2>
                    <p className='text-lg sm:text-xl text-accent' data-aos='fade-down' data-aos-delay='700'>
                        Revolutionizing Artificial Intelligence through neuro-inspired algorithms.
                    </p>
                </div>
            </div>

            <section className='bg-base-100 py-16'>
                <div className='max-w-6xl mx-auto px-6 md:px-12 lg:px-16'>
                    <h2 className='text-3xl sm:text-4xl font-semibold text-center mb-8 text-primary' data-aos='zoom-in-up'>
                        Who We Are
                    </h2>
                    <p className='text-base sm:text-lg mb-12 text-secondary text-justify' data-aos='zoom-in-down' data-aos-delay='700'>
                        Neuro AI is a leading innovator in the field of artificial intelligence, harnessing the power of neural networks to solve complex problems. Our team of experts is dedicated to pushing the boundaries of AI technology and creating solutions that can have a lasting impact on industries and society.
                    </p>

                    <div className='grid gap-8 md:grid-cols-2'>
                        {[
                            {
                                title: 'Our Mission',
                                desc: 'Our mission is to bring AI closer to human-level intelligence, revolutionizing various sectors such as healthcare, finance, and robotics, by creating neuro-inspired algorithms that enhance decision-making processes.',
                            },
                            {
                                title: 'Our Vision',
                                desc: 'We aim to be at the forefront of AI research, developing technologies that improve the quality of life and contribute to global innovation. We envision a future where AI enhances human creativity and productivity.'
                            }
                        ].map(({ title, desc }, index) => {
                            const aos = index === 0 ? 'fade-down' : 'fade-up';
                            return (
                                <div key={index} data-aos={aos} data-aos-delay='700' className='tooltip tooltip-bottom' data-tip={title}>
                                    <div className='p-6 skeleton shadow-md rounded-md text-left hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:cursor-pointer'
                                    >
                                        <h3 className='text-2xl text-accent font-semibold mb-4'>{title}</h3>
                                        <p className='italic text-base text-justify'>{desc}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default About
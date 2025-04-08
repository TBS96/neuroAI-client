import React from 'react'

const FeaturesSection = () => {
    return (
        <>
            <section className='py-16 my-16 bg-gray-100/50 hover:shadow-2xl transition-all duration-300 ease-in-out' id='features' data-aos='zoom-in-up'>
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
                            <div key={index} className='bg-base-300 p-6 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:cursor-pointer rounded-md text-left'>
                                <img
                                    src={feature.img}
                                    alt={feature.title}
                                    className='w-full h-48 object-cover rounded-md mb-4'
                                />
                                <h3 className='text-2xl font-medium'>{feature.title}</h3>
                                <p className='mt-2'>{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default FeaturesSection
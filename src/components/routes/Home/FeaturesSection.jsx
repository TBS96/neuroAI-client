import React from 'react'

const FeaturesSection = () => {
    return (
        <>
            <section className='py-16 my-16 rounded-xl bg-gray-100/50 hover:shadow-2xl transition-all duration-300 ease-in-out' id='features'>
                <div className='container mx-auto px-6 md:px-12 text-center'>
                    <h2 className='text-3xl md:text-4xl font-semibold' data-aos='zoom-in-up'>
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
                        ].map(({ img, title, desc }, index) => (
                            <div key={index} data-aos='zoom-in-up' className='tooltip' data-tip={title}>
                                <div className='bg-base-300 p-6 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:cursor-pointer rounded-md text-left'>
                                    <img
                                        src={img}
                                        alt={title}
                                        className='w-full h-48 object-cover rounded-md mb-4'
                                        loading='lazy'
                                    />
                                    <h3 className='text-2xl font-medium'>{title}</h3>
                                    <p className='mt-2'>{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default FeaturesSection
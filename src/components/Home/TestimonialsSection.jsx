import React from 'react'

const TestimonialsSection = () => {
    return (
        <>
            <section className='py-16 my-16 bg-slate-700/50 hover:shadow-2xl transition-all duration-300 ease-in-out' id='testimonials'>
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
                            <div key={index} className='p-6 skeleton shadow-md rounded-md text-left hover:shadow-2xl transition-all duration-300 hover:rotate-2 hover:cursor-pointer'>
                                <p className='italic'>'{testimonial.quote}'</p>
                                <div className='mt-4'>
                                    <h4 className='text-lg font-medium'>{testimonial.author}</h4>
                                    <p className='text-sm text-base-100 font-semibold'>{testimonial.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default TestimonialsSection
import React from 'react'
import { FeaturesSection, HeroSection, HowItWorksSection, TestimonialsSection } from '../components'

const Home = () => {
    return (
        <>
            <title>neuroAI | Home</title>
            <main>
                <HeroSection />
                <FeaturesSection />
                <HowItWorksSection />
                <TestimonialsSection />
            </main>
        </>
    )
}

export default Home
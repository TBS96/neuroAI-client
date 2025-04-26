import React, { useEffect } from 'react'
import { FeaturesSection, HeroSection, HowItWorksSection, TestimonialsSection } from '../components'

const Home = () => {

    useEffect(() => {
        document.title = 'neuroAI | Home';
    });

    return (
        <>
            <HeroSection />
            <FeaturesSection />
            <HowItWorksSection />
            <TestimonialsSection />
        </>
    )
}

export default Home
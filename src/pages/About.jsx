import React, { useEffect } from 'react'
import { About as AboutComponent } from '../components/index'

const About = () => {

    useEffect(() => {
        document.title = 'neuroAI | About'
    }, []);

    return (
        <>
            <AboutComponent />
        </>
    )
}

export default About
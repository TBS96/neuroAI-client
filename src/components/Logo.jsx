import React from 'react'
import { Link } from 'react-router-dom'

function Logo({width = '100px'}) {
    return (
        <Link to='/' className=''>
            <img 
                src='/public/favicon/apple-touch-icon.png'
                alt='NeuroAI Logo'
                className='btn rounded-2xl h-16'
                style={{width}}
            />
        </Link>
    )
}

export default Logo
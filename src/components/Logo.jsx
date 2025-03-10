import React from 'react'

function Logo({width = '100px'}) {
    return (
        <a href='/' className=''>
            <img 
                src='/favicon/apple-touch-icon.png'
                alt='NeuroAI Logo'
                className='btn rounded-2xl h-16'
                style={{width}}
            />
        </a>
    )
}

export default Logo
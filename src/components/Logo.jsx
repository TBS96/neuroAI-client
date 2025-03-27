import React from 'react'

function Logo({width = '100px'}) {
    return (
        <a href='/' className=''>
            <img 
                src='https://i.ibb.co/R4Yv6dLV/android-chrome-192x192-removebg-preview.png'
                alt='NeuroAI Logo'
                className='h-16'
                style={{width}}
            />
        </a>
    )
}

export default Logo
import React from 'react'

function Logo({width = '100px'}) {
    return (
        <a href='/' className='btn btn-ghost'>
            <img 
                src='https://i.ibb.co/R4Yv6dLV/android-chrome-192x192-removebg-preview.png'
                alt='NeuroAI Logo'
                className=''
                style={{ width: width === '100%' ? 'auto' : 'width' }}
            />
        </a>
    )
}

export default Logo
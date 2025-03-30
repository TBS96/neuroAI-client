import React from 'react'
import { Link } from 'react-router-dom'

function Logo({width = '100px'}) {
    return (
        <Link to={'/'} className='btn btn-ghost sm:btn-sm md:btn-lg'>
            <img 
                src='https://i.ibb.co/R4Yv6dLV/android-chrome-192x192-removebg-preview.png'
                alt='NeuroAI Logo'
                className=''
                style={{ width: width === '100%' ? 'auto' : 'width' }}
            />
        </Link>
    )
}

export default Logo
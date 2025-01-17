import React from 'react'
import Button from '../components/Button'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <div className='h-screen grid place-content-center text-2xl bg-yellow-300'>
            <Link to='/chatbot'>
                <Button type='button' className='hover:bg-green-600'>Chat with Bot</Button>
            </Link>
        </div>
    )
}

export default Home
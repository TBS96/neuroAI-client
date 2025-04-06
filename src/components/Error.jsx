import { AlertOctagon, ArrowLeftCircle } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
    return (
        <div className='min-h-screen flex flex-col items-center justify-center px-4 border rounded-2xl border-error text-center'>
            <AlertOctagon size={150} />
            <h1 className='text-2xl md:text-4xl font-bold my-4'>This content isn't available at the moment</h1>
            <p className='text-xl mb-6'>When this happens, it's usually because the owner only shared it with a small group of people or changed who can see it, or it's been deleted.</p>
            <Link to='/' className='btn btn-dash group flex items-center gap-2'>
                <ArrowLeftCircle className='transition-all duration-300 group-hover:-translate-x-3' /> Go back to Home
            </Link>
        </div>
    )
}

export default Error
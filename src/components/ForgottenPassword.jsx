import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input } from './index'
import { Link } from 'react-router-dom';
import { ArrowLeftCircle } from 'lucide-react'

const ForgottenPassword = () => {

    // const { register, handleSubmit, formState: { errors } } = useForm();
    const { register, handleSubmit } = useForm();

    const [error, setError] = useState('');

    const [data, setData] = useState('');

    const onSubmit = (data) => {
        console.log(`Forgot Password Data: ${data}`);
        // Later: Use Axios to POST data.email to backend
    };

    return (
        <div className='min-h-screen flex items-center justify-center w-full px-4 sm:px-0 '>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='bg-gray-100/10 p-8 rounded-2xl shadow-2xl w-full max-w-md'
            >
                <h2 className='text-2xl font-bold mb-6 text-center' data-aos='fade-up' data-aos-duration='700'>
                    Forgot Password
                </h2>

                <div className='space-y-5'>
                    <Input
                        type='email'
                        placeholder='example@domain.com'
                        {...register('email', {
                            required: true,
                            validate: {
                                matchPattern: (value) => /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) || 'Email address must be a valid address',
                            }
                        })}
                        data-aos='fade-right'
                        data-aos-duration='1000'
                    />

                    {error && (
                        <p className='text-red-600 mt-8 text-center animate-pulse bg-red-100'>
                            {data.email} doesn't exist in our database.
                        </p>
                    )}

                    <Button type='submit' className='w-full' data-aos='fade-up' data-aos-duration='1200'>
                        Send Reset Link
                    </Button>

                    <Link to='/login' className='btn btn-dash btn-sm group flex items-center gap-2' data-aos='fade-right' data-aos-duration='1200' data-aos-delay='2000'>
                        <ArrowLeftCircle className='transition-all duration-300 group-hover:-translate-x-3' /> Go Back
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default ForgottenPassword
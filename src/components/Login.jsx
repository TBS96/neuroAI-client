import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'
import { Button, Input, Logo } from './index'

function Login () {

    const navigate = useNavigate();

    const { register, handleSubmit } = useForm();

    const [error, setError] = useState('');

    const [data, setData] = useState('');

    const [showPass, setShowPass] = useState(false);

    const login = () => {};

    return (
        <div className='flex items-center justify-center w-full my-8 px-4 sm:px-0'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className='mb-2 flex justify-center'>
                    <span className='inline-block w-full max-w-[100px]'>
                        <Logo width='100%' />
                    </span>
                </div>
                <h2 className='text-center text-2xl font-bold leading-tight'>Sign in to your account</h2>
                <p className='mt-2 text-center text-base text-black/60'>
                    Don&apos;t have any account?&nbsp;
                    <Link to='/signup' className='font-medium text-primary transition-all duration-200 hover:underline'>
                        Sign Up
                    </Link>
                </p>
                {error && 
                    <p className='text-red-600 mt-8 text-center bg-error-content animate-pulse'>{error}</p>
                }
                <form onSubmit={handleSubmit(login)} className='mt-8 form-control'>
                    <div className='space-y-5'>
                        <Input
                            label='Email: '
                            placeholder='example@domain.com'
                            type='email'
                            {...register('email', {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) || 'Email address must be a valid address',
                                }
                            })}
                        />
                        {error && 
                            <p className='text-red-600 mt-8 text-center animate-pulse bg-red-100'>{data.email} doesn't exist in our database. Please Sign Up!</p>
                        }
                        <div className='flex items-end sm:flex-col gap-2'>
                            <Input
                                label='Password: '
                                placeholder='✪✪✪✪✪✪✪✪✪✪✪'
                                type={showPass ? 'text' : 'password'}
                                {...register('password', {
                                    required: true,
                                })}
                            />
                            <input type='checkbox' className='hidden' id='show' onChange={() => setShowPass(!showPass)} />
                            <label htmlFor="show" className='btn btn-square btn-outline'>{showPass ? 'hide' : 'show'}</label>
                        </div>
                        <Button type='submit' className='w-full hover:bg-green-600'>Sign in</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
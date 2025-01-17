import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'
import { Button, Input, Logo } from './index'

function Signup () {

    const navigate = useNavigate();

    const { register, handleSubmit } = useForm();
    
    const [error, setError] = useState('');

    const [showPass, setShowPass] = useState(false);

    const create = () => {};

    return (
        <div className='flex items-center justify-center w-full my-8 px-4 sm:px-0'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className='mb-2 flex justify-center'>
                    <span className='inline-block w-full max-w-[100px]'>
                        <Logo width='100%' />
                    </span>
                </div>
                <h2 className='text-center text-2xl font-bold leading-tight'>Sign up to create an account</h2>
                <p className='mt-2 text-center text-base text-black/60'>
                    Already have an account?&nbsp;
                    <Link to='/login' className='font-medium text-primary transition-all duration-200 hover:underline'>
                        Sign In
                    </Link>
                </p>
                {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}

                <form onSubmit={handleSubmit(create)} className='mt-8 form-control'>
                    <div className='space-y-5'>
                        <Input
                            label='Full Name: '
                            type='text'
                            placeholder='Full Name'
                            {...register('name', {
                                required: true,
                            })}
                        />
                        <Input
                            label='Email: '
                            placeholder='example@domain.com'
                            type='email'
                            {...register('email', {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        'Email address must be a valid address',
                                }
                            })}
                        />
                        <Input
                            label='Phone Number: '
                            placeholder='+91-XXXXXXXXXX'
                            type='tel'
                            {...register('phone_number', {
                                required: true,
                            })}
                        />
                        <Input
                            label='Date of Birth: '
                            type='date'
                            {...register('dob', {
                                required: true,
                            })}
                        />
                        <Input
                            label='Age: '
                            placeholder='Age'
                            type='number'
                            {...register('age', {
                                required: true,
                            })}
                        />
                        <Input
                            label='Address: '
                            placeholder='Street Address'
                            type='text'
                            autocomplete='street-address'
                            {...register('address', {
                                required: true,
                            })}
                        />
                        <Input
                            label='Occupation: '
                            placeholder='Occupation'
                            type='text'
                            {...register('occupation', {
                                required: true,
                            })}
                        />
                        <Input
                            label='Password: '
                            placeholder='✪✪✪✪✪✪✪✪✪✪✪'
                            type={showPass ? 'text' : 'password'}
                            {...register('password', {
                                required: true,
                            })}
                        />
                        <div className='flex items-end sm:flex-col gap-2'>
                            <Input
                                label='Confirm Password: '
                                placeholder='✪✪✪✪✪✪✪✪✪✪✪'
                                type={showPass ? 'text' : 'password'}
                                {...register('password', {
                                    required: true,
                                })}
                            />
                            <input type='checkbox' className='hidden' id='show' onChange={() => setShowPass(!showPass)} />
                            <label htmlFor="show" className='btn btn-square btn-outline'>{showPass ? 'hide' : 'show'}</label>
                        </div>
                        <Button type='submit' className='w-full hover:bg-blue-700'>
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'
import { Button, Input, Logo } from './index'
import { Eye, EyeClosed } from 'lucide-react';

function Signup() {

    const navigate = useNavigate();

    const { register, handleSubmit, watch } = useForm();

    const [error, setError] = useState('');

    const [showPass, setShowPass] = useState(false);

    const [showConfirmPass, setShowConfirmPass] = useState(false);

    const create = () => { };

    return (
        <div className='flex items-center justify-center w-full my-8 px-4 sm:px-0'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100/5 rounded-xl p-10 border border-black/10`}>
                <div className='mb-2 flex justify-center'>
                    <span className='inline-block w-full max-w-[100px]'>
                        <Logo width='100%' />
                    </span>
                </div>
                <h2 className='text-center text-2xl font-bold leading-tight'>Sign up to create an account</h2>
                <p className='mt-2 text-center text-base text-base-content/45'>
                    Already have an account?&nbsp;
                    <Link to='/login' className='font-medium text-primary transition-all duration-200 hover:underline'>
                        Sign In
                    </Link>
                </p>
                {error && <p className='text-error mt-8 text-center'>{error}</p>}

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
                        <div className='relative'>
                            <Input
                                label='Password: '
                                placeholder='••••••••'
                                type={showPass ? 'text' : 'password'}
                                {...register('password', {
                                    required: true,
                                    maxLength: 16,
                                    minLength: 8,
                                })}
                            />
                            <button
                                type='button'
                                onClick={() => setShowPass(!showPass)}
                                className='absolute right-3 top-1/2 hover:cursor-pointer active:translate-y-[1px] duration-300 transition-all'
                            >
                                {!showPass ? <EyeClosed size={25} className='text-secondary' /> : <Eye size={25} className='text-primary' />}
                            </button>
                        </div>
                        <div className='relative'>
                            <Input
                                label='Confirm Password: '
                                placeholder='••••••••'
                                type={showConfirmPass ? 'text' : 'password'}
                                {...register('confirmPassword', {
                                    required: true,
                                    maxLength: 16,
                                    minLength: 8,
                                    validate: {
                                        matchPattern: (value) => value === watch('password') || 'Passwords do not match',
                                    }
                                })}
                            />
                            <button
                                type='button'
                                onClick={() => setShowConfirmPass(!showConfirmPass)}
                                className='absolute right-3 top-1/2 hover:cursor-pointer active:translate-y-[1px] duration-300 transition-all'
                            >
                                {!showConfirmPass ? <EyeClosed size={25} className='text-secondary' /> : <Eye size={25} className='text-primary' />}
                            </button>
                        </div>

                        <div className="text-sm text-base-content/70 bg-base-100/50 p-3 rounded-md">
                            <p className='font-bold'>Password must contain:</p>
                            <ul className="list-disc pl-5">
                                <li>At least 8 characters</li>
                                <li>At least one uppercase letter</li>
                                <li>At least one lowercase letter</li>
                                <li>At least one number</li>
                                <li>At least one special character (!@#$%^&*)</li>
                            </ul>
                        </div>
                        <Button type='submit' className='w-full'>
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'
import { Button, Input, Logo } from './index'
import { Eye, EyeClosed } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../store/authSlice';

function Register() {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { register, handleSubmit, watch } = useForm();

    const [error, setError] = useState('');

    const [showPass, setShowPass] = useState(false);

    const [showConfirmPass, setShowConfirmPass] = useState(false);

    const registerAccount = async (formData) => {
        setError('');

        try {
            const responseUserData = await dispatch(registerUser(formData)).unwrap();
            console.log(`Registration successful: ${responseUserData}`);
            navigate('/');
        }
        catch (err) {
            const errorMessage = typeof err === 'object' ? (err.email ? err.email[0] : JSON.stringify(err)) : err;
            setError(errorMessage);
            console.error(`Registration error: ${errorMessage}`);
        }
    };

    return (
        <div className='flex items-center justify-center w-full my-8 px-4 sm:px-0'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100/5 rounded-xl p-10 border border-black/10`}>
                <div className='mb-2 flex justify-center'>
                    <span className='inline-block w-full max-w-[100px]'>
                        <Logo width='100%' />
                    </span>
                </div>
                <h2 className='text-center text-2xl font-bold leading-tight' data-aos='fade-up'>Register to create an account</h2>
                <p className='mt-2 text-center text-base text-base-content/45' data-aos='zoom-in-right'>
                    Already have an account?&nbsp;
                    <Link to='/login' className='font-medium text-primary transition-all duration-200 hover:underline'>
                        Sign In
                    </Link>
                </p>

                {error &&
                    <p className='text-error mt-8 text-center bg-error-content animate-pulse'>
                        {error}
                    </p>
                }

                <form onSubmit={handleSubmit(registerAccount)} className='mt-8 form-control'>
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
                            className={error ? 'validator bg-error focus:bg-yellow-500' : ''}
                            {...register('email', {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(value) ||
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
                            min={10}
                            {...register('age', {
                                required: true,
                            })}
                        />
                        <Input
                            label='Address: '
                            placeholder='Street Address'
                            type='text'
                            autoComplete='street-address'
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
                                data-aos='zoom-in-right'
                                {...register('password', {
                                    required: true,
                                    maxLength: 16,
                                    minLength: 6,
                                })}
                            />
                            <button
                                type='button'
                                onClick={() => setShowPass(!showPass)}
                                className='absolute right-3 top-1/2 hover:cursor-pointer active:translate-y-[1px] duration-300 transition-all'
                                data-aos='fade-up'
                            >
                                {!showPass ? <EyeClosed size={25} className='text-secondary' /> : <Eye size={25} className='text-primary' />}
                            </button>
                        </div>
                        {/* <div className='relative'>
                            <Input
                                label='Confirm Password: '
                                placeholder='••••••••'
                                type={showConfirmPass ? 'text' : 'password'}
                                data-aos='zoom-in-right'
                                {...register('confirmPassword', {
                                    required: true,
                                    maxLength: 16,
                                    minLength: 6,
                                    validate: {
                                        matchPattern: (value) => value === watch('password') || 'Passwords do not match',
                                    }
                                })}
                            />
                            <button
                                type='button'
                                onClick={() => setShowConfirmPass(!showConfirmPass)}
                                className='absolute right-3 top-1/2 hover:cursor-pointer active:translate-y-[1px] duration-300 transition-all'
                                data-aos='fade-up'
                            >
                                {!showConfirmPass ? <EyeClosed size={25} className='text-secondary' /> : <Eye size={25} className='text-primary' />}
                            </button>
                        </div> */}

                        <div tabIndex={0} className="collapse collapse-plus bg-base-100 border-base-300 border" data-aos='zoom-in-right'>
                            <input type="checkbox" className='peer' />
                            <div className="collapse-title font-semibold bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">Password Constraints</div>
                            <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
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
                            </div>
                        </div>

                        <Button type='submit' className='w-full' data-aos='fade-up'>
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register
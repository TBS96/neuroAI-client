import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Input, Logo } from '../index'
import { Eye, EyeClosed } from 'lucide-react';
import { loginUser } from '../../store/slices/authSlice'

function Login() {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { register, handleSubmit } = useForm();

    const [error, setError] = useState('');

    const [data, setData] = useState('');

    const [showPass, setShowPass] = useState(false);

    const login = async (credentials) => {
        setError('');
        setData(credentials);
        try {
            // Dispatch the async thunk to login the user
            const responseUserData = await dispatch(loginUser(credentials)).unwrap();    // Use the async thunk

            // console.log(`Backend response: ${JSON.stringify(responseUserData)}`);

            if (responseUserData && responseUserData.access) {
                // If login is successful
                const { refresh, access } = responseUserData;
                localStorage.setItem('refreshToken', refresh);
                localStorage.setItem('accessToken', access);
                console.log('login success');
                navigate('/');
            }
        }
        catch (err) {
            console.error("Login Error:", err);

            // Check if error was rejected by Redux Toolkit
            const errorMessage = err || 'Login failed. Please check your credentials.';

            setError(errorMessage);
            console.log("Stored error in state:", errorMessage);
        }
    };

    return (
        <div className='flex items-center justify-center w-full my-8 px-4 sm:px-0 scroll-smooth' id='signupTarget'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100/10 rounded-xl p-10 border border-black/10`}>
                <div className='mb-2 flex justify-center'>
                    <span className='inline-block w-full max-w-[100px]'>
                        <Logo width='100%' />
                    </span>
                </div>
                <h2 className='text-center text-2xl font-bold leading-tight' data-aos='fade-up'>Sign in to your account</h2>
                <p className='mt-2 text-center text-base text-base-content/45' data-aos='zoom-in-right'>
                    Don&apos;t have any account?&nbsp;
                    <Link to='/register' className='font-medium text-primary transition-all duration-200 hover:link'>
                        Register
                    </Link>
                </p>

                {error && (
                    <p className='text-error mt-8 text-center bg-error-content animate-pulse'>
                        {error}
                    </p>
                )}

                <form
                    onSubmit={handleSubmit(login)}
                    className='mt-8 form-control'
                >
                    <div className='space-y-5'>
                        <Input
                            label='Email: '
                            placeholder='example@domain.com'
                            type='email'
                            className={error ? 'validator bg-error focus:bg-yellow-500' : ''}
                            {...register('email', {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) || 'Email address must be a valid address',
                                }
                            })}
                        />

                        {error && data.email && (
                            <p className='text-red-600 mt-8 text-center animate-pulse bg-red-100'>{data.email} doesn't exist in our database. Please Sign Up!</p>

                        )}

                        <div className='relative'>
                            <Input
                                label='Password: '
                                placeholder='••••••••'
                                type={showPass ? 'text' : 'password'}
                                {...register('password', {
                                    required: true,
                                    maxLength: 16,
                                    minLength: 6
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

                        <span className='relative flex items-center justify-end'>
                            <Link to='/forgotten-password' className='link link-accent'>Forgotten Password?</Link>
                        </span>

                        <Button type='submit' className='w-full'>Sign in</Button>
                    </div>
                </form>

                <div className="join join-vertical bg-base-100 mt-5">
                    <div className="collapse collapse-arrow join-item border-base-300 border">
                        <input type="checkbox" name="my-accordion-4" />
                        <div className="collapse-title font-semibold">How do I create an account?</div>
                        <div className="collapse-content text-sm">Click the <a href='#signupTarget' className='font-bold text-primary link'>Sign Up</a> button in the top right corner and follow the registration process.</div>
                    </div>
                    <div className="collapse collapse-arrow join-item border-base-300 border">
                        <input type="checkbox" name="my-accordion-4" />
                        <div className="collapse-title font-semibold">I forgot my password. What should I do?</div>
                        <div className="collapse-content text-sm">Click on <span className='font-bold'>"Forgotten Password"</span> above and follow the instructions sent to your email.</div>
                    </div>
                    <div className="collapse collapse-arrow join-item border-base-300 border">
                        <input type="checkbox" name="my-accordion-4" />
                        <div className="collapse-title font-semibold">How do I update my profile information?</div>
                        <div className="collapse-content text-sm">Go to "My Account" settings and select "Edit Profile" to make changes.</div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Login



// NOTES:
// dispatch(loginUser(credentials)) will resolve to the latest action that has been dispatched by that thunk.

// With .unwrap(), i.e., dispatch(loginUser(credentials)).unwrap(), it will resolve to the value of the fulfilled action, or throw on a rejected action.

// The idea here is that you should be able to dispatch an asyncThunk without having to catch it every time, but only if you really want to write more logic based on it.
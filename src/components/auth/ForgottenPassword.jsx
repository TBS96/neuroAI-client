import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input } from '../index'
import { Link } from 'react-router-dom';
import { ArrowLeftCircle } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux';
import { requestPasswordReset } from '../../store/slices/authSlice';

const ForgottenPassword = () => {

    const { register, handleSubmit } = useForm();

    const dispatch = useDispatch();

    const { loading, error } = useSelector(state => state.auth);

    const [successMessage, setSuccessMessage] = useState('');

    const [serverError, setServerError] = useState('');
    // const [error, setError] = useState('');

    const sendPasswordResetLink = async (data) => {
        setServerError('');
        setSuccessMessage('');
        try {
            const res = await dispatch(requestPasswordReset(data.email)).unwrap();
            setSuccessMessage(`Reset link sent! Check your inbox.`);
            console.log(`Forgot Password Data: ${res}`);
        }
        catch (err) {
            console.error(`Forgot Password Error: ${err}`)
            setServerError(err?.message || 'Something went wrong. Please try again!');
            setSuccessMessage('');
        }
    };

    useEffect(() => {
        if (error) {
            setSuccessMessage('');
        }
    }, [error]);

    return (
        <div className='min-h-screen flex items-center justify-center w-full px-4 sm:px-0 '>
            <form
                onSubmit={handleSubmit(sendPasswordResetLink)}
                className='bg-gray-100/10 p-8 rounded-2xl shadow-2xl w-full max-w-md'
            >
                <h2 className='text-2xl font-bold mb-6 text-center' data-aos='fade-up' data-aos-duration='700'>
                    Forgot Password
                </h2>

                <div className='space-y-5'>

                    {serverError && (
                        <p className='text-red-600 mt-8 text-center animate-pulse bg-red-100 p-2 rounded'>
                            {serverError}
                        </p>
                    )}

                    {error && (
                        <p className='text-red-600 mt-8 text-center animate-pulse bg-red-100 p-2 rounded'>
                            {error}
                        </p>
                    )}
                    <Input
                        type='email'
                        placeholder='example@domain.com'
                        className={error ? 'validator bg-error focus:bg-yellow-500' : ''}
                        {...register('email', {
                            required: true,
                            validate: {
                                matchPattern: (value) => /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) || 'Email address must be a valid address',
                            }
                        })}
                        data-aos='fade-up'
                        data-aos-duration='1000'
                    />

                    {successMessage && (
                        <p className='text-green-500 mt-8 text-center animate-pulse bg-green-100 p-2 rounded'>
                            {successMessage}
                        </p>
                    )}

                    <Button
                        type='submit'
                        disabled={loading}
                        className='w-full'
                        data-aos='fade-up'
                        data-aos-duration='1200'
                    >
                        {loading ? 'Sending...' : 'Send Reset Link'}
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
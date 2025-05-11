import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { confirmPasswordReset } from '../../store/slices/authSlice';
import { Button, Input } from '../index';
import { LoaderPinwheel } from 'lucide-react';

const PasswordResetConfirm = () => {

    const { token } = useParams();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { loading, error } = useSelector(state => state.auth);

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const [serverError, setServerError] = useState('');

    const [successMessage, setSuccessMessage] = useState('');

    const resetPassword = async (data) => {
        setServerError('');
        setSuccessMessage('');

        try {
            const res = await dispatch(confirmPasswordReset({ token, password: data.password, confirmPassword: data.confirmPassword })).unwrap();
            console.log(`Password reset success: ${res}`);
            setSuccessMessage('Password has been reset successfully. You can now log in.');
            setTimeout(() => navigate('/login', 2500));
        }
        catch (err) {
            console.error(`Password reset error: ${err}`);
            setServerError(err?.message || 'Failed to reset password. Try again.');
        }
    };

    useEffect(() => {
        if (error) {
            setSuccessMessage('');
        }
    }, [error]);

    return (
        <div className='min-h-screen flex items-center justify-center w-full px-4 sm:px-0'>
            <form
                onSubmit={handleSubmit(resetPassword)}
                className='bg-gray-100/10 p-8 rounded-2xl shadow-2xl w-full max-w-md'
            >
                <h2 className='text-2xl font-bold mb-6 text-center' data-aos='fade-up' data-aos-duration='700'>
                    Reset Your Password
                </h2>

                <div className='space-y-5'>

                    {serverError && (
                        <p className='text-red-600 mt-4 text-center animate-pulse bg-red-100 p-2 rounded'>
                            {serverError}
                        </p>
                    )}

                    {error && (
                        <p className='text-red-600 mt-4 text-center animate-pulse bg-red-100 p-2 rounded'>
                            {error}
                        </p>
                    )}

                    <Input
                        type='password'
                        placeholder='New Password'
                        {...register('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 8,
                                message: 'Password must be atleast 8 characters'
                            },
                            maxLength: {
                                value: 16,
                                message: 'Password should not be more than 16 characters'
                            },
                        })}
                        className={error ? 'validator bg-error focus:bg-yellow-500' : ''}
                        data-aos='fade-up'
                        data-aos-duration='900'
                    />

                    {errors.password && (
                        <p className='text-red-600 mt-8 text-center animate-pulse bg-red-100 p-2 rounded'>
                            {errors.password.message}
                        </p>
                    )}

                    <Input
                        type='password'
                        placeholder='Confirm Password'
                        {...register('confirmPassword', {
                            validate: (value) => value === watch('password') || 'Passwords do not match',
                        })}
                        className={error ? 'validator bg-error focus:bg-yellow-500' : ''}
                        data-aos='fade-up'
                        data-aos-duration='1000'
                    />

                    {errors.confirmPassword && (
                        <p className='text-red-600 mt-8 text-center animate-pulse bg-red-100 p-2 rounded'>
                            {errors.confirmPassword.message}
                        </p>
                    )}

                    {successMessage && (
                        <p className='text-green-500 mt-4 text-center animate-pulse bg-green-100 p-2 rounded'>
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
                        {loading ? (
                            <span className='flex items-center gap-2'>
                                Resetting...
                                <LoaderPinwheel className='animate-spin text-success' />
                            </span>
                        ) : 'Reset Password'
                        }
                    </Button>

                </div>
            </form>
        </div>
    )
}

export default PasswordResetConfirm
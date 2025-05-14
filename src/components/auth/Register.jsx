import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'
import { Button, Input, Logo } from '../index'
import { Eye, EyeClosed, LoaderPinwheel } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../store/slices/authSlice';

function Register() {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { loading, error } = useSelector(state => state.auth);

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();

    const [serverError, setServerError] = useState('');

    const [successMessage, setSuccessMessage] = useState('');

    const [showPass, setShowPass] = useState(false);

    // const [showConfirmPass, setShowConfirmPass] = useState(false);

    const dobValue = watch('dob');

    useEffect(() => {
        if (dobValue) {
            const today = new Date();
            const birthDate = new Date(dobValue);
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }

            if (age >= 0) {
                setValue('age', age);
            }
        }
    }, [dobValue, setValue]);

    const registerAccount = async (formData) => {
        setServerError('');
        setSuccessMessage('');

        try {
            const responseUserData = await dispatch(registerUser(formData)).unwrap();
            console.log(`Registration successful: ${responseUserData}`);
            setSuccessMessage('Registration Successfull. Welcome!');
            setTimeout(() => navigate('/'), 2500);
        }
        catch (err) {
            // const errorMessage = typeof err === 'object' ? (err.email ? err.email[0] : JSON.stringify(err)) : err;
            console.error(`Registration error: ${err}`);
            setServerError(err || 'Registration failed. Please try again.');
        }
    };

    useEffect(() => {
        if (error) {
            setSuccessMessage('');
        }
    }, [error]);

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

                {serverError &&
                    <p className='text-error mt-8 text-center bg-error-content animate-pulse'>
                        {serverError}
                    </p>
                }

                <form onSubmit={handleSubmit(registerAccount)} className='mt-8 form-control'>
                    <div className='space-y-5'>
                        <Input
                            label='Full Name: '
                            type='text'
                            placeholder='Full Name'
                            {...register('name', {
                                required: 'Full Name is required',
                            })}
                        />

                        {errors.name && (
                            <p className='text-red-600 mt-8 text-center animate-pulse bg-red-100 p-2 rounded'>
                                {errors.name.message}
                            </p>
                        )}

                        <Input
                            label='Email: '
                            placeholder='example@domain.com'
                            type='email'
                            className={error ? 'validator bg-error focus:bg-yellow-500' : ''}
                            {...register('email', {
                                required: 'Email is required',
                                validate: {
                                    matchPattern: (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(value) ||
                                        'Email address must be a valid address',
                                }
                            })}
                        />

                        {errors.email && (
                            <p className='text-red-600 mt-8 text-center animate-pulse bg-red-100 p-2 rounded'>
                                {errors.email.message}
                            </p>
                        )}

                        <Input
                            label='Phone Number: '
                            placeholder='+91-XXXXXXXXXX'
                            type='tel'
                            {...register('phone_number', {
                                required: 'Phone number is required',
                            })}
                        />

                        {errors.phone_number && (
                            <p className='text-red-600 mt-8 text-center animate-pulse bg-red-100 p-2 rounded'>
                                {errors.phone_number.message}
                            </p>
                        )}

                        <Input
                            label='Date of Birth: '
                            type='date'
                            {...register('dob', {
                                required: 'Date of birth is required',
                                validate: value => {
                                    const dob = new Date(value);
                                    const today = new Date();

                                    const minAgeDate = new Date();
                                    minAgeDate.setFullYear(today.getFullYear() - 16);

                                    const maxAgeDate = new Date();
                                    maxAgeDate.setFullYear(today.getFullYear() - 100);

                                    if (dob > minAgeDate) return 'You must be at least 16 years old';
                                    else if (dob < maxAgeDate) return 'You must be younger than 100 years old';
                                    return true;
                                }
                            })}
                        />

                        {errors.dob && (
                            <p className='text-red-600 mt-8 text-center animate-pulse bg-red-100 p-2 rounded'>
                                {errors.dob.message}
                            </p>
                        )}

                        <Input
                            label='Age: '
                            placeholder='Age'
                            type='number'
                            disabled
                            {...register('age', {
                                required: 'Age is required',
                            })}
                        />
                        {errors.age && (
                            <p className='text-red-600 mt-8 text-center animate-pulse bg-red-100 p-2 rounded'>
                                {errors.age.message}
                            </p>
                        )}

                        <Input
                            label='Address: '
                            placeholder='Street Address'
                            type='text'
                            autoComplete='street-address'
                            {...register('address', {
                                required: 'Full address is required',
                            })}
                        />

                        {errors.address && (
                            <p className='text-red-600 mt-8 text-center animate-pulse bg-red-100 p-2 rounded'>
                                {errors.address.message}
                            </p>
                        )}

                        <Input
                            label='Occupation: '
                            placeholder='Occupation'
                            type='text'
                            {...register('occupation', {
                                required: 'Occupation is required',
                            })}
                        />
                        {errors.occupation && (
                            <p className='text-red-600 mt-8 text-center animate-pulse bg-red-100 p-2 rounded'>
                                {errors.occupation.message}
                            </p>
                        )}

                        <div className='relative'>
                            <Input
                                label='Password: '
                                placeholder='••••••••'
                                type={showPass ? 'text' : 'password'}
                                data-aos='zoom-in-right'
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

                        {errors.password && (
                            <p className='text-red-600 mt-8 text-center animate-pulse bg-red-100 p-2 rounded'>
                                {errors.password.message}
                            </p>
                        )}

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
                                    Registering...
                                    <LoaderPinwheel className='animate-spin text-success' />
                                </span>
                            ) : 'Register'
                            }
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register
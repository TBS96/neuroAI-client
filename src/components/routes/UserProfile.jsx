import React from 'react'
import { useSelector } from 'react-redux'
// import { Navigate, useParams } from 'react-router-dom'

const UserProfile = () => {

    const userData = useSelector(state => state.auth.userData);

    // TODO: fix direct logout from userprofile page. Current issue: shows error page when trying to logout from user profile page.
    // const { userName } = useParams();
    
    
    // if (!userData) return <Navigate to={'/'} />
    const { name, email, phone_number, dob, age, address, occupation } = userData;

    // const actualUserName = name?.toLowerCase().split(' ')[0];

    // if (userName.toLowerCase() !== actualUserName) return <Navigate to={'/error'} />

    return (
        <section className='min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 py-16 px-4'>
            <div data-aos='zoom-in-up' data-aos-duration='1000'>
                <div className='max-w-3xl mx-auto card bg-white/10 shadow-md hover:shadow-2xl duration-300 transition-all rounded-3xl p-8 md:p-12'>
                    <div className='flex flex-col items-center space-y-4'>

                        <div className='avatar'>
                            <div className='w-24 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2'>
                                <img
                                    src={`https://ui-avatars.com/api/?name=${name}&background=random`}
                                    alt='avatar'
                                />
                            </div>
                        </div>

                        <h2 className='text-4xl font-bold text-center text-purple-700'>
                            {name}
                        </h2>
                        <p className='text-sm'>📌 {occupation}</p>

                        <div className='divider' />

                        <div className='w-full space-y-3'>
                            <div className='flex justify-between'>
                                <span className='font-semibold'>📧 Email:</span>
                                <span>{email}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span className='font-semibold'>📱 Phone:</span>
                                <span>{phone_number}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span className='font-semibold'>🎂 DOB:</span>
                                <span>{dob}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span className='font-semibold'>🎈 Age:</span>
                                <span>{age}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span className='font-semibold'>🏠 Address:</span>
                                <span className='text-right'>{address}</span>
                            </div>
                        </div>

                        <div className='mt-6'>
                            <span className='badge badge-success badge-lg p-4 text-white shadow-md'>
                                Profile Active
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default UserProfile
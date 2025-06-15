import { useSelector } from 'react-redux'

const UserProfile = () => {

    const userData = useSelector(state => state.auth.userData);

    const {
        name = 'Guest',
        email = 'N/A',
        phone_number = 'N/A',
        dob = 'N/A',
        age = 'N/A',
        address = 'N/A',
        occupation = 'N/A',
    } = userData || {};

    if (!userData) {
        return (
            <section className='min-h-screen grid place-items-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 py-16 px-4'>
                <div className='text-center text-white text-xl font-semibol'>You are being logged out...</div>
            </section>
        )
    }

    return (
        <section className='min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 py-16 px-4'>
            <div data-aos='zoom-in-up' data-aos-duration='1000'>
                <div className='max-w-3xl mx-auto card bg-white/10 shadow-md hover:shadow-2xl duration-300 transition-all rounded-3xl p-8 md:p-12'>
                    <div className='flex flex-col items-center space-y-4'>

                        <div className='avatar tooltip' data-tip={name}>
                            <div className='w-24 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2'>
                                <img
                                    src={`https://ui-avatars.com/api/?name=${name}&background=random`}
                                    alt='avatar'
                                    loading='lazy'
                                />
                            </div>
                        </div>

                        <h2 className='text-4xl font-bold text-center text-purple-700'>
                            {name}
                        </h2>
                        <p className='text-sm tooltip tooltip-bottom' data-tip='Occupation'>📌 {occupation}</p>

                        <div className='divider' />

                        <div className='w-full space-y-3'>
                            <div className='flex justify-between'>
                                <span className='font-semibold'>📧 Email:</span>
                                <span className='hover:link tooltip tooltip-left' data-tip={email}>
                                    <a href={`mailto:${email}`}>{email}</a>
                                </span>
                            </div>
                            <div className='flex justify-between'>
                                <span className='font-semibold'>📱 Phone:</span>
                                <span className='hover:underline tooltip tooltip-left' data-tip={phone_number}>
                                    <a href={`tel:${phone_number}`}>{phone_number}</a>
                                </span>
                            </div>
                            <div className='flex justify-between'>
                                <span className='font-semibold'>🎂 DOB:</span>
                                <span className='tooltip tooltip-left' data-tip={dob}>{dob}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span className='font-semibold'>🎈 Age:</span>
                                <span className='tooltip tooltip-left' data-tip={age}>{age}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span className='font-semibold'>🏠 Address:</span>
                                <span className='text-right tooltip tooltip-left' data-tip={address}>{address}</span>
                            </div>
                        </div>

                        <div className='mt-6'>
                            <span className='badge badge-success badge-lg p-4 text-white shadow-md tooltip tooltip-bottom' data-tip='Active User'>
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
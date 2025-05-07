import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import LogoutBtn from './LogoutBtn';

const UserBadge = () => {

    const userData = useSelector(state => state.auth.userData);
    const userName = userData?.name || 'Guest';
    // console.log(`Hello ${userData.email}`);

    return (

        <div className='drawer'>
            <input id='my-drawer' type='checkbox' className='drawer-toggle' />
            <div className='drawer-content'>
                <label htmlFor='my-drawer' className='btn font-bold px-5 py-1 ms-10 md:ms-40 rounded-2xl bg-base-300 drawer-button'>Hello {userName}!</label>
            </div>

            <div className='drawer-side'>
                <label htmlFor='my-drawer' aria-label='close sidebar' className='drawer-overlay'></label>
                <ul className='menu glass text-base-content min-h-full w-80 p-4'>
                    <li>
                        <Link to={'/'} className='btn btn-block mb-2'>View Profile</Link>
                    </li>
                    <li>
                        <LogoutBtn />
                    </li>
                </ul>
            </div>
        </div>
    )

}

export default UserBadge
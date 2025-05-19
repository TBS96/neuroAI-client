import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import LogoutBtn from './LogoutBtn';
import { ArrowRight, ArrowRightCircle } from 'lucide-react';

const UserBadge = () => {

    const userData = useSelector(state => state.auth.userData);
    const userName = userData?.name || 'Guest';
    // console.log(`Hello ${userData.email}`);

    return (

        <div className='drawer'>
            <input id='my-drawer' type='checkbox' className='drawer-toggle' />
            <div className='drawer-content' title={`Hi ${userName}! Click Me to View Your Profile or Logout`}>
                <label htmlFor='my-drawer' className='ms-10 md:ms-40 drawer-button'>
                    <div className='avatar'>
                        <div className='btn btn-circle ring ring-secondary ring-offset-base-100 ring-offset-2' title={userName}>
                            <img
                                src={`https://ui-avatars.com/api/?name=${userName}&background=random`}
                                alt='avatar'
                            />
                        </div>
                    </div>
                </label>
            </div>

            <div className='drawer-side'>
                <label htmlFor='my-drawer' aria-label='close sidebar' className='drawer-overlay'></label>
                <ul className='menu glass text-base-content min-h-full w-80 p-4'>
                    <li title='View Profile'>
                        <Link to={`/profile/${userName}`} className='btn btn-block mb-2 group flex items-center gap-2'>
                            View Profile <ArrowRight className='transition-all duration-300 group-hover:translate-x-3' />
                        </Link>
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

{/* <Link to='/' className='btn btn-dash group flex items-center gap-2'> */ }
{/* <ArrowLeftCircle className='transition-all duration-300 group-hover:-translate-x-3' /> Go back to Home */ }
{/* </Link> */ }
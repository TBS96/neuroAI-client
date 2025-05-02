import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const UserBadge = () => {

    const userData = useSelector(state => state.auth.userData);
    const userName = userData?.name || 'Guest';
    // console.log(`Hello ${userData.email}`);

    return (
        <Link to={'/'} className='font-bold px-5 py-1 rounded-2xl bg-base-300'>
            Hello {userName}!
        </Link>
    )

}

export default UserBadge
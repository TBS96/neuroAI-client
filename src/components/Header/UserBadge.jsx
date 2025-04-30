import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const UserBadge = () => {

    const [userName, setUserName] = useState('Guest');

    const userData = useSelector(state => state.auth.userData);
    // console.log(`Username: ${JSON.stringify(userData)}`);

    useEffect(() => {
        if (userData && typeof userData === 'object' && userData.name) {
            setUserName(userData.name);
        }
    }, [userData]);

    return (
        <Link to={'/'} className='font-bold px-5 py-1 rounded-2xl bg-base-300'>
            Hello {userName}!
        </Link>
    )

}

export default UserBadge
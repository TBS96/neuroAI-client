import React, { useEffect } from 'react'
import { UserProfile as UserProfileComponent } from '../components/index'
import { useSelector } from 'react-redux';

function Signup() {

    const userName = useSelector(state => state.auth.userData.name);

    useEffect(() => {
        document.title = `neuroAI | ${userName}`;
    }, []);

    return (
        <>
            <UserProfileComponent />
        </>
    )
}

export default Signup
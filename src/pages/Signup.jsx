import React, { useEffect } from 'react'
import { Signup as SignupComponent } from '../components'

function Signup() {

    useEffect(() => {
        document.title = 'neuroAI | Signup';
    }, []);;

    return (
        <>
            <SignupComponent />
        </>
    )
}

export default Signup
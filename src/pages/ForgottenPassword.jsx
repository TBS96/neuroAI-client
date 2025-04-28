import React, { useEffect } from 'react'
import { ForgottenPassword as ForgottenPasswordComponent } from '../components'

function Signup() {

    useEffect(() => {
        document.title = 'neuroAI | Forgotten Password';
    }, []);;

    return (
        <>
            <ForgottenPasswordComponent />
        </>
    )
}

export default Signup
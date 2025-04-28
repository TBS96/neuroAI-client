import React, { useEffect } from 'react'
import { Register as RegisterComponent } from '../components'

function Signup() {

    useEffect(() => {
        document.title = 'neuroAI | Register';
    }, []);;

    return (
        <>
            <RegisterComponent />
        </>
    )
}

export default Signup
import React, { useEffect } from 'react'
import { Login as LoginComponent } from '../components'

function Login() {

    useEffect(() => {
        document.title = 'neuroAI | Login'
    }, []);

    return (
        <>
            <LoginComponent />
        </>
    )
}

export default Login
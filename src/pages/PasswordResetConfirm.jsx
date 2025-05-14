import React, { useEffect } from 'react'
import { PasswordResetConfirm as PasswordResetConfirmComponent } from '../components'

function PasswordResetConfirm() {

    useEffect(() => {
        document.title = 'neuroAI | Confirm Password Reset';
    }, []);;

    return (
        <>
            <PasswordResetConfirmComponent />
        </>
    )
}

export default PasswordResetConfirm
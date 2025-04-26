import React from 'react'
import { Error as ErrorPage } from '../components/index'

const Error = () => {

    document.title = 'neuroAI | 404';

    return (
        <>
            <ErrorPage />
        </>
    )
}

export default Error
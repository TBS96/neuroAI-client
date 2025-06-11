import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

export default function Protected({ children, authentication = true }) {

    const navigate = useNavigate();

    const [loader, setLoader] = useState(true);

    const authStatus = useSelector(state => state.auth.status);
    // console.log(`Authenticated: ${authStatus}`);

    useEffect(() => {
        // Condition 1: Protected route AND user is NOT authenticated
        if (authentication && !authStatus) {
            console.log('Protected route, user not authenticated. Navigating to /login.');
            navigate('/login/', { replace: true }); // Use replace: true to prevent going back after logout
        }
        // Condition 2: Non-protected route AND user IS authenticated (e.g., trying to visit /login or /signup while already logged in)
        else if (!authentication && authStatus) {
            console.log('Non-protected route, user authenticated. Navigating to /.');
            navigate('/', { replace: true });
        }
        setLoader(false);
    }, [authStatus, navigate, authentication]);

    return loader ? (
        <p className='flex justify-center items-center h-screen text-lg font-semibold text-gray-700'>Loading authentication...</p>
    ) : (
        <>{children}</>
    )
}
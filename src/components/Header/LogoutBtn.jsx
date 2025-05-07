import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/slices/authSlice'

function LogoutBtn() {

    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout());
        document.activeElement.blur();
    };

    const closeDropdown = () => {
        document.activeElement.blur();
    };

    return (
        <>
            <div className='dropdown dropdown-bottom'>
                <div tabIndex={0} role='button' className='btn btn-dash btn-error mb-2 md:mb-0 '>Logout</div>
                <ul tabIndex={0} className='dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow-sm'>
                    <li>
                        <button onClick={logoutHandler} className='btn btn-sm btn-error w-full mb-2'>Confirm Logout</button>
                    </li>
                    <li>
                        <button onClick={closeDropdown} className='btn btn-outline btn-sm w-full'>Cancel</button>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default LogoutBtn
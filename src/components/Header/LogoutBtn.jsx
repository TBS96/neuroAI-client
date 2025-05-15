import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../store/slices/authSlice'

function LogoutBtn() {

    const dispatch = useDispatch();

    const refreshToken = useSelector(state => state.auth.refreshToken);

    const logoutHandler = () => {
        dispatch(logoutUser(refreshToken));
        document.activeElement.blur();
    };

    const closeDropdown = () => {
        document.activeElement.blur();
    };

    return (
        <>
            <div className='dropdown dropdown-bottom'>
                <div tabIndex={0} role='button' className='btn btn-dash btn-block btn-error mb-2 md:mb-0' title='Logout'>Logout</div>
                <ul tabIndex={0} className='dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow-sm'>
                    <li title='Confirm Logout'>
                        <button onClick={logoutHandler} className='btn btn-sm btn-error w-full mb-2'>Confirm Logout</button>
                    </li>
                    <li title='Cancel'>
                        <button onClick={closeDropdown} className='btn btn-outline btn-sm w-full'>Cancel</button>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default LogoutBtn
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../store/slices/authSlice'
import { useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'

function LogoutBtn() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const refreshToken = useSelector(state => state.auth.refreshToken);

    const logoutHandler = async () => {
        try {
            await dispatch(logoutUser(refreshToken)).unwrap();
            console.log(`Logout successfull, navigating to /login`);
            document.activeElement.blur();
            navigate('/login');
        }
        catch (err) {
            console.error(`Logout failed: ${err}`);
            dispatch({ type: 'auth/logout' });
            document.activeElement.blur();
            navigate('/login');
        }
    };

    const closeDropdown = () => {
        document.activeElement.blur();
    };

    return (
        <>
            <div className='dropdown dropdown-bottom'>
                <div tabIndex={0} role='button' className='btn btn-dash btn-block btn-error mb-2 md:mb-0' title='Logout'>
                    Logout <LogOut size={20} className=' ms-2' />
                </div>
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
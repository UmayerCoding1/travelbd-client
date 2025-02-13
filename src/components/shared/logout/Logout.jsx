import React from 'react';
import { LuLogOut as LogoutIcon } from 'react-icons/lu';
import useAuth from '../../../hooks/useAuth';

const Logout = ({style}) => {
    const {logoutUser} = useAuth();
    return (
        <li onClick={logoutUser}className={`${style}  cursor-pointer`} ><LogoutIcon/> Logout</li>
    );
};

export default Logout;
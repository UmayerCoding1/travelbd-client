import React, { useEffect, useState } from 'react';
import { FaEdit as EditIcon } from 'react-icons/fa';
import useLoggedUserData from '../../../../hooks/useLoggedUserData';
import Tooltip from '../../../shared/tooltip/Tooltip';

const BasicInfo = ({ action }) => {
    const [userData, setUserData] = useState();
    const [showTooltip, setShowTooltip] = useState(false)
    const [LoggedUser] = useLoggedUserData();

    useEffect(() => {
        if (LoggedUser && LoggedUser.length > 0) {
            setUserData(LoggedUser[0]);
        }
    }, [LoggedUser]);

    const { fullName, userName, email, gender, marital_status, date_of_Birth, nationalID, religion, emergency_contact } = userData || 'N/A';
    const handleTooltip = () => {
        setShowTooltip(true);
    }
    const handleMouseLeave = () => {
        setShowTooltip(false);
    };

    return (
        <div >
            <div className='flex justify-between items-center relative'>
                <div>
                    <h2 className='text-xl font-bold'>Profile</h2>
                    <p className='text-sm text-gray-500'>Basic info, for a faster booking experience</p>
                </div>

                <button 
                    onMouseEnter={handleTooltip}
                    onMouseLeave={handleMouseLeave} 
                    onClick={() => action(true)} className='flex gap-1'> <EditIcon className='text-2xl' /> <span className='font-semibold'>Edit</span></button>
                {showTooltip && <div className='absolute top-[-25px] right-[-50px]'>
                    <Tooltip content={'Update info'} />
                </div>}
            </div>


            <div className='mt-5'>
                <div className='flex items-center '>
                    <p className='text-sm text-gray-500  w-48'>Name</p>
                    {
                        fullName ? <p className='font-semibold'>{fullName}</p> : <p className='font-semibold'>N<span className='font-normal text-sm'>/</span>A</p>
                    }
                </div>
                <hr className='mt-3 mb-3' />

                <div className='flex items-center '>
                    <p className='text-sm text-gray-500  w-48'>User name</p>
                    {
                        userName ? <p className='font-semibold'>{userName}</p> : <p className='font-semibold'>N<span className='font-normal text-sm'>/</span>A</p>
                    }
                </div>
                <hr className='mt-3 mb-3' />

                <div className='flex items-center '>
                    <p className='text-sm text-gray-500  w-48'>Email</p>
                    {
                        email ? <p className='font-semibold'>{email}</p> : <p className='font-semibold'>N<span className='font-normal text-sm'>/</span>A</p>
                    }
                </div>
                <hr className='mt-3 mb-3' />

                <div className='flex items-center '>
                    <p className='text-sm text-gray-500  w-48'>Gender</p>
                    {
                        gender ? <p className='font-semibold'>{gender}</p> : <p className='font-semibold'>N<span className='font-normal text-sm'>/</span>A</p>
                    }
                </div>
                <hr className='mt-3 mb-3' />

                <div className='flex items-center '>
                    <p className='text-sm text-gray-500  w-48'>Marital Status</p>
                    {
                        marital_status ? <p className='font-semibold'>{marital_status}</p> : <p className='font-semibold'>N<span className='font-normal text-sm'>/</span>A</p>
                    }
                </div>
                <hr className='mt-3 mb-3' />

                <div className='flex items-center '>
                    <p className='text-sm text-gray-500  w-48'>Date of Birth</p>
                    {
                        date_of_Birth ? <p className='font-semibold'>{date_of_Birth}</p> : <p className='font-semibold'>N<span className='font-normal text-sm'>/</span>A</p>
                    }
                </div>
                <hr className='mt-3 mb-3' />

                <div className='flex items-center '>
                    <p className='text-sm text-gray-500  w-48'>National ID</p>
                    {
                        nationalID ? <p className='font-semibold'>{nationalID}</p> : <p className='font-semibold'>N<span className='font-normal text-sm'>/</span>A</p>
                    }
                </div>
                <hr className='mt-3 mb-3' />

                <div className='flex items-center '>
                    <p className='text-sm text-gray-500  w-48'>Religion</p>
                    {
                        religion ? <p className='font-semibold'>{religion}</p> : <p className='font-semibold'>N<span className='font-normal text-sm'>/</span>A</p>
                    }
                </div>
                <hr className='mt-3 mb-3' />
                <div className='flex items-center '>
                    <p className='text-sm text-gray-500  w-48'>Emergency Contact</p>
                    {
                        emergency_contact ? <p className='font-semibold'>{emergency_contact}</p> : <p className='font-semibold'>N<span className='font-normal text-sm'>/</span>A</p>
                    }
                </div>
            </div>
        </div>
    );
};

export default BasicInfo;
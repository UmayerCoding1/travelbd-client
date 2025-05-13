import React, { useEffect, useState } from 'react';
import { EditIcon, ProfileIcon, GroupIcon, SettingsIcon, BookingIcon, HeartICon, KeyIcon, CloseIcon, SelectIcon, } from '../../../../provider/IconProvider';
import useAuth from '../../../../hooks/useAuth';
import Logout from '../../../shared/logout/Logout';
import BasicInfoForm from './BasicInfoForm';
import BasicInfo from './BasicInfo';
import useLoggedUserData from '../../../../hooks/useLoggedUserData';
import toast, { Toaster } from 'react-hot-toast';
import { NavLink } from 'react-router';
import Tooltip from '../../../shared/tooltip/Tooltip'
import useSecureApiEndPoint from '../../../../hooks/useSecureApiEndPoint';
import Loading from '../../../shared/loading/Loading';
import { logo } from '../../../../provider/ImageProvider';
import UsePublicApiEndpoint from '../../../../hooks/usePublicApiEndpoint';
import { Helmet } from 'react-helmet';


const Profile = () => {
    const [loading, setLoading] = useState(false);
    const [updatePersonalInfo, setUpdatePersonalInfo] = useState(false);
    const [showTooltip,setShowTooltip] = useState(false);
    const [showChangePassword,setShowChangePassword] = useState(false);
    const [changedPassword,setChangePassword] = useState(false);
    const [isLoading,setIsLoading] = useState(false);
    const [user, setUser] = useState();
    const {setUser: updateSetUser} = useAuth();
    const secureApiEndPoint = useSecureApiEndPoint();
    // const aass = UsePublicApiEndpoint();
    const [LoggedUser, loggedUserRefetch] = useLoggedUserData();
    useEffect(() => {
        if (LoggedUser && LoggedUser.length > 0) {
            setUser(LoggedUser[0]);
        }
    }, [LoggedUser]);
    const liStyle = 'flex items-center gap-2 text-xl font-semibold text-gray-600 p-3 rounded-lg hover:bg-[#E1F2F8] cursor-pointer';

    const handleUpdateAvatar = async (e) => {
        const avatarImage = e.target.files[0];
        const formData = new FormData();
        formData.append('avatar', avatarImage);
        setLoading(true);

        const response = await secureApiEndPoint.put('/update-avatar', formData);
        if (response.data.data) {
          
            updateSetUser(response.data.data)
            toast.success(response.data.message);
            setLoading(false)
            loggedUserRefetch();
        }


    }

    const handleTooltip = () => {
        setShowTooltip(true);
    }
    const handleMouseLeave = () => {
        setShowTooltip(false);
      };
      
      const handleChangePassword =async (e) => {
       try {
         e.preventDefault();
         const form = e.target;
         const email = form.email.value;
         const oldPassword = form.oldPassword.value;
         const newPassword = form.newPassword.value;
         const retypeNewPassword = form.retypeNewPassword.value;
 
         const changePassword = {
             email,
             oldPassword,
             newPassword,
         }
 
         if (!email.includes('@')) {
            return toast.error('Email is not valid') 
         }
 
         if(newPassword.length < 6){
             return toast.error('Password must be 6 digits', {position: 'bottom-right'})
         }
 
         if (newPassword !== retypeNewPassword) {
             return  toast.error('New password is not match',{position: 'bottom-right'})
         }
 
 
 
        const response = await secureApiEndPoint.post('/change-password', changePassword);
        if (response.data.data) {
           setChangePassword(true);
        }
       } catch (error) {
         toast.error('Do not match old password', {position: 'top-right', duration:1500})
        
       }
       
        
        
        
    }
    return (
        <div className='  lg:p-20 pt-5 lg:grid grid-cols-4 gap-6 max-w-6xl mx-auto'>
            <Helmet><title>{user ? `${user.fullName} profile` : 'Profile'} | Travel BD</title></Helmet>
            <div className='bg-white shadow-lg w-full mb-5 lg:h-[52vh] col-span-1 p-1 pr-1 pt-2 '>
                <div className='w-full flex items-center justify-between lg:justify-start  lg:gap-5'>
                    {user?.avatar ? <img className='cursor-default w-28 h-28 rounded-full' src={user?.avatar} alt='profile image' />
                        :
                        <button className='bg-[#E1F2F8] border border-blue-900 cursor-default w-28 h-28 rounded-full flex items-center justify-center'><ProfileIcon className='text-5xl text-[#51B5D7]' /></button>}

                    {loading ? <p className='text-sm text-gray-500'>Avatar image update...</p>
                        :
                        <div className="flex items-center gap-2 relative">
                            <label
                                htmlFor="fileUpload"
                                className="flex items-center px-4 py-2 cursor-pointer"
                            >
                                <div
                                onMouseEnter={handleTooltip}
                                onMouseLeave={handleMouseLeave} 
                                className='flex items-center'>
                                <EditIcon
                                className="text-2xl" /> <span className="font-semibold">Edit</span>
                                <input onChange={handleUpdateAvatar} type="file" name='avatar' id="fileUpload" className="hidden" />
                                </div>

                                {showTooltip && <div className='absolute top-[-20px]'>
                                    <Tooltip content={'Update avatar'}/>
                                </div>}
                            </label>
                        </div>
                    }
                </div>

                <ul className='mt-4'>
                    <li><NavLink className={`${liStyle}`} to={'/my-booking'}><BookingIcon /> <span className='text-sm'>My Booking</span></NavLink></li>
                    <li><NavLink className={`${liStyle}`} to={'/Saved'}><HeartICon /> <span className='text-sm'>Saved</span></NavLink></li>
                    <li onClick={() => {
                    setIsLoading(true);
                    setTimeout(() => {
                        setShowChangePassword(true);
                        setIsLoading(false);
                        setChangePassword(false)
                    },2000)
                 }} className={`${liStyle}`}><KeyIcon /> <span className='text-sm'>Change Password</span></li>
                 {isLoading && <div className='w-full h-screen bg-black/50 absolute left-0 top-0 z-10 flex items-center justify-center'>
                       <Loading/>
                    </div>}


                    {showChangePassword && <div className='w-full h-screen bg-black/50 absolute left-0 top-0 z-10 flex items-center justify-center'>
                                        <div className='w-[400px] h-[450px] bg-white rounded-lg p-3'>
                                          <div className='flex items-center justify-between'>
                                           <img className='w-40' src={logo} alt="" />
                                           <CloseIcon onClick={() => setShowChangePassword(false)} className='w-8 h-8 text-lg bg-gray-200 text-gray-600 p-2 rounded-full cursor-pointer '/>
                                          </div>
                                             
                                        {changedPassword ?  <div className='flex flex-col items-center justify-evenly h-full'>
                                            <button className='text-9xl text-emerald-500'><SelectIcon/></button>
                                            <button onClick={() => setShowChangePassword(false)} className='w-full h-10 bg-emerald-500  rounded-lg text-sm font-bold text-white' type='button'>Back</button>
                                        </div>
                                        :
                                           <form onSubmit={handleChangePassword} className='mt-5 p-5'>
                                               <div className='mb-3'>
                                                   <label className='text-sm pl-1 font-semibold' htmlFor="old-pass">Email</label>
                                                   <input className='w-full h-10 outline-none bg-gray-100 rounded-lg text-sm pl-2' type="email" name="email" placeholder='Type hear...' required/>
                                               </div>
                                               <div className='mb-3'>
                                                   <label className='text-sm pl-1 font-semibold' htmlFor="old-pass">Old password</label>
                                                   <input className='w-full h-10 outline-none bg-gray-100 rounded-lg text-sm pl-2' type="password" name="oldPassword" placeholder='Type hear...' required/>
                                               </div>
                                               <div className='mb-3'>
                                                   <label className='text-sm pl-1 font-semibold' htmlFor="new-pass">New password</label>
                                                   <input className='w-full h-10 outline-none bg-gray-100 rounded-lg text-sm pl-2' type="password" name="newPassword" placeholder='Type hear...' required/>
                                               </div>
                                               <div className='mb-3'>
                                                   <label className='text-sm pl-1 font-semibold' htmlFor="Retype -new-pass">Retype new password</label>
                                                   <input className='w-full h-10 outline-none bg-gray-100 rounded-lg text-sm pl-2' type="password" name="retypeNewPassword" placeholder='Type hear...' required/>
                                                  
                                               </div>

                                               {changedPassword ? <button className='w-full h-10 bg-emerald-500  rounded-lg text-sm font-bold text-white' type='button'>Back</button>
                                                 :
                                                 <button className='w-full h-10 bg-blue-500 rounded-lg text-sm font-bold text-white' type='submit'>Update password</button>
                                               }
                                           </form>
}
                                        </div>
                                    </div>}






                    <Logout style={'flex items-center gap-2 text-sm font-semibold  p-3 rounded-lg hover:bg-red-50 text-red-500'} />
                </ul>



            </div>




            <div className='bg-white shadow-lg  w-full col-span-3 p-5'>
                {
                    updatePersonalInfo ? <BasicInfoForm action={setUpdatePersonalInfo} /> : <BasicInfo action={setUpdatePersonalInfo} />
                }



            </div>
            
            <Toaster containerStyle={false} position='bottom-right' />
        </div>
    );
};

export default Profile;
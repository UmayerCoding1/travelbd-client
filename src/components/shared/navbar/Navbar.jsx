import React, { useEffect, useRef, useState } from 'react';
import { logo, userImg } from '../../../provider/ImageProvider';
import { Link, NavLink } from 'react-router';
import { ArrowDownIcon, BookingIcon, CloseIcon, HeartICon, LogoutIcon, MenuIcon, ProfileIcon, RightArrowIcon } from '../../../provider/IconProvider';
import useAuth from '../../../hooks/useAuth';
import Logout from '../logout/Logout';
import { HiOutlineXMark } from "react-icons/hi2";
// import useLoggedUserData from '../../../hooks/useLoggedUserData';

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);
  const [showUserNav, setShowUserNav] = useState(false);
  const { user } = useAuth()
  const hideUserNavRef = useRef(null);

  const navLink = <>
    <li className='font-semibold mr-5 text-[13px]'><NavLink to={'/'}>Home</NavLink></li>
    <li className='font-semibold mr-5 text-[13px]'><NavLink to={'/hotel'}>Hotel</NavLink></li>
    <li className='font-semibold mr-5 text-[13px]'><NavLink to={'/destinations'}>Destinations</NavLink></li>
    <li className='font-semibold mr-5 text-[13px]'><NavLink to={'/travel-blog'}>Travel Blog</NavLink></li>
    <li className='font-semibold mr-5 text-[13px]'><NavLink to={'/contact-us'}>Contact Us</NavLink></li>
  </>

  const userNavItem = <>
    <li><NavLink className={'flex items-center gap-2 text-xl font-semibold text-white p-3 rounded-lg hover:bg-[#E1F2F8] hover:text-black cursor-pointer'} to={'/profile'}><ProfileIcon /> <span className='text-xs'>Profile</span></NavLink></li>
    <li><NavLink className={'flex items-center gap-2 text-xl font-semibold text-white p-3 rounded-lg hover:bg-[#E1F2F8] hover:text-black cursor-pointer'} to={'/my-booking'}><BookingIcon /> <span className='text-xs'>My Booking</span></NavLink></li>
    <li><NavLink className={'flex items-center gap-2 text-xl font-semibold text-white p-3 rounded-lg hover:bg-[#E1F2F8] hover:text-black cursor-pointer'} to={'/Saved'}><HeartICon /> <span className='text-xs'>Saved</span></NavLink></li>

    <Logout style={'flex items-center gap-2 text-xs font-semibold  p-3 rounded-lg hover:bg-red-50 text-red-500'} />
  </>

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (hideUserNavRef.current && !hideUserNavRef.current.contains(e.target)) {
        setShowUserNav(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);

    if (showNav) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [showNav]);

  console.log('show nav',showNav);
  return (
    <header className='mb-2 shadow-lg p-2 '>
      {/* dectop */}
      <nav className='hidden lg:flex items-center justify-between lg:px-3'>
        <Link to={'/'}> <img className='w-40' src={logo} alt="" /></Link>

        <ul className='flex'>
          {navLink}
        </ul>

        <div>

          {user ? <div>

            <div onClick={(e) => {
              e.stopPropagation();
              setShowUserNav(!showUserNav)
            }} className='flex items-center cursor-pointer relative'>
              <img className='w-8 h-8 rounded-full' src={user.avatar ? user.avatar : userImg} alt="" />
              <ArrowDownIcon className='text-gray-500' />


              <div ref={hideUserNavRef} className={`bg-[#000] rounded-lg shadow-2xl w-44  p-3 absolute z-10 top-10 left-[-140px] ${showUserNav ? '' : 'hidden'}`}>
                <ul>
                  {userNavItem}
                </ul>
              </div>
            </div>



          </div>
            :
            <Link to={'/sign-in'}>
              <button className='flex items-center justify-center bg-[#F0721D] w-20 h-8 rounded-lg text-xs text-white transition-all ease-linear duration-200 overflow-hidden hover:text-[13px] hover:font-bold'>Sign In <RightArrowIcon /></button>
            </Link>
          }

        </div>


      </nav>

      {/* mobile */}
      <nav className='lg:hidden flex items-center justify-between mb-2'>
        <Link to={'/'}> <img className='w-40' src={logo} alt="" /></Link>

        <div className='flex gap-2'>

          {user && <Link to={'/profile'}><img className='w-8 h-8 rounded-full' src={user?.avatar ? user?.avatar : userImg} alt="" /></Link>}

          <button
            onClick={() => setShowNav(true)}
          ><MenuIcon className='text-3xl' /></button>
        </div>


        {showNav && <div onClick={() => setShowNav(false)} className='w-full h-screen bg-[#00000032] absolute z-10 left-0 top-0'>
          <div onClick={(e) => e.stopPropagation()} className='w-1/2 h-screen bg-white relative px-2'>
            <button onClick={() => setShowNav(false)}><HiOutlineXMark className='text-3xl absolute top-1 right-3' /></button>

            <ul className=''>
              {navLink}
              {user ? <Logout style={'flex items-center gap-2 text-xs font-semibold  p-3 rounded-lg hover:bg-red-50 text-red-500'} /> 
              : <Link to={'/sign-in'}>
              <button className='flex items-center justify-center mt-2 bg-[#F0721D] w-20 h-8 rounded-lg text-xs text-white transition-all ease-linear duration-200 overflow-hidden hover:text-[13px] hover:font-bold'>Sign In <RightArrowIcon /></button>
            </Link> 
            }
            </ul>
          </div>
        </div>}
      </nav>
    </header>
  );
};

export default Navbar;
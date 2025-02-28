import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { logo } from '../../../provider/ImageProvider';
import useAuth from '../../../hooks/useAuth';
import toast, { Toaster } from 'react-hot-toast';
import { CloseIcon } from '../../../provider/IconProvider';
import Loading from '../../shared/loading/Loading';
import UsePublicApiEndpoint from '../../../hooks/usePublicApiEndpoint';
import { Helmet } from 'react-helmet';
const SignIn = () => {
    const {loginUser,setUser,setLoading} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const navigateForm = location.state?.form || '/';
    const publicApiEndPoint = UsePublicApiEndpoint();
    
    console.log(location);
    const handleSignIn = (e) => {
       e.preventDefault();
       const from = e.target;
       const email = from.email.value;
       const password = from.password.value;
       const loginData = {email,password};
       
       loginUser(loginData)
       .then(res => {
        if(res.data.data.user){
          setUser(res.data.data.user);
          localStorage.setItem('accessToken', res.data.data.accessToken)
          setLoading(false);
          toast.success(res.data.message);

          setTimeout(() => {
            navigate(navigateForm)
          },500)
        }
        
       })
       .catch(err => {
         err.status === 404 ?  toast.error('Email is not exist', {duration: 1000}): null
         err.status === 401 ? toast.error('Password is not valid', {duration: 1000}) : null;
         if (err.status !== 404 && err.status !== 401) {
             toast.error(err.message, {duration: 500});
         }
       })
       
    }

    
    return (
        <div className='flex items-center justify-center lg:h-screen bg-[#DADBDD] lg:p-10 relative'>
            <Helmet><title>Sign in | Travel BD</title></Helmet>
            <div className='bg-white h-screen w-full  flex items-center justify-center'>
               
               <div className='w-full lg:w-[40%] lg:p-5 pb-0 '>
            
             <form onSubmit={handleSignIn} className=' p-5 lg:p-16 pt-5 border'>
                <div>
                    <h2 className='text-3xl font-bold'>Sign In</h2>
                    
                </div>
                <div className='bg-gray-200 h-14 mt-5 p-2 rounded-lg relative'>
                    <p className='text-xs font-bold absolute top-2 z-10 font-Inconsolata' >Email</p> <br />
                    <input className='outline-none absolute text-xs pt-2 top-0 left-0 pl-2 bg-transparent w-full h-full ' type="email" name='email' placeholder='abc@gmail.com' autoComplete='email'/>
                </div>

                <div className='bg-gray-200 h-14 mt-5 p-2 rounded-lg relative'>
                    <p className='text-xs font-bold absolute top-2 z-10 font-Inconsolata' >Password</p> <br />
                    <input className='outline-none absolute text-xs pt-2 top-0 left-0 pl-2 bg-transparent w-full h-full ' type="password" name='password' placeholder='type hear' autoComplete='current-password'/>
                </div>
                 

                
              

                <div>
                    <button className='w-full h-10 rounded-lg mt-3 font-semibold bg-black text-white text-xs' type='submit'>Sign In</button>
                </div>
                <p className='text-xs mt-2 text-center font-semibold'> Create a new account? <Link to={'/sign-up'} className='link'>Sign Up</Link></p>
             </form>
           </div>
           <Toaster position='top-center' reverseOrder={false}/>
            </div>
        </div>
    );
};

export default SignIn;
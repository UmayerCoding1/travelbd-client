import React, { useState } from 'react';
import loginImg from '../../../assets/image/login-img.jpg'
import { logo } from '../../../provider/ImageProvider';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
// import UseApiEndpoint from '../../../hooks/UseapiEndpoint';
import useAuth from '../../../hooks/useAuth';
import toast, { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet';
const SignUp = () => {
    const [error,setError] = useState('');
    const {createUser,setUser} = useAuth();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()
      const onSubmit = async(data) => {
        if (data.password.length < 6) {
            return setError('Password length at list 6')
        }
        const userData ={
            fullName : data.fullName,
            userName: data.userName,
            email: data.email,
            password:data.password
        }

            createUser(userData)
            .then(res => {
                console.log(res.data);
                
               toast.success(res.data.message);
               setError('')
               navigate('/sign-in')
             
             })
             .catch(err => {
              console.log(err);
              if (err.status === 409) {
                toast.error("This email already exist")
              }
             })
      }
      const handleSignUp = (e) => {
        e.preventDefault;
        handleSubmit(onSubmit)(e);
      }
    return (
        <div className='flex items-center justify-center h-screen bg-[#DADBDD] lg:p-10'>
            <Helmet><title>Sign Up | Travel BD</title></Helmet>
        <div className='bg-white w-full h-full lg:flex'>
           <div className='w-full lg:w-[40%] p-5 pb-0 '>
            <Link to='/'>
            <img className='w-20' src={logo} alt="" />
            </Link>
             <form onSubmit={handleSignUp} className='p-10 pt-5'>
                <div>
                    <h2 className='text-3xl font-bold'>Sign Up</h2>
                    <p className='text-xs text-gray-500 mt-2'>Let's start with some facts about you</p>
                </div>


                <div className='bg-gray-200 h-14 mt-5 p-2 rounded-lg relative'>
                    <p className='text-xs font-bold absolute top-2 z-10 font-Inconsolata' >Fullname</p> <br />
                    <input className='outline-none absolute text-xs pt-2 top-0 left-0 pl-2 bg-transparent w-full h-full ' type="text" {...register("fullName", {required: true})} placeholder='type hear'/>
                </div>

                <div className='bg-gray-200 h-14 mt-5 p-2 rounded-lg relative'>
                    <p className='text-xs font-bold absolute top-2 z-10 font-Inconsolata' >User Name</p> <br />
                    <input className='outline-none absolute text-xs pt-2 top-0 left-0 pl-2 bg-transparent w-full h-full ' type="text" {...register("userName", {required: true})} placeholder='type hear'/>
                </div>

                <div className='bg-gray-200 h-14 mt-5 p-2 rounded-lg relative'>
                    <p className='text-xs font-bold absolute top-2 z-10 font-Inconsolata' >Email</p> <br />
                    <input className='outline-none absolute text-xs pt-2 top-0 left-0 pl-2 bg-transparent w-full h-full ' type="email" {...register("email")} placeholder='abc@gmail.com'/>
                </div>

                <div className='bg-gray-200 h-14 mt-5 p-2 rounded-lg relative'>
                    <p className='text-xs font-bold absolute top-2 z-10 font-Inconsolata' >Password</p> <br />
                    <input className='outline-none absolute text-xs pt-2 top-0 left-0 pl-2 bg-transparent w-full h-full ' type="password" {...register("password", {required: true})} placeholder='type hear'/>
                    
                </div>
                {error ?<p className='text-xs pl-2 text-red-500 font-semibold'>{error}</p> : ''}
                
                {/* todo */}


                <div>
                    <button className='w-full h-10 rounded-lg mt-3 bg-black text-white text-xs' type='submit'>Sign Up</button>
                </div>
                <p className='text-xs mt-1 text-center font-semibold'>Already yoy have an account? <Link to={'/sign-in'} className='link'>Sign In</Link></p>
             </form>
           </div>

           <div className='hidden w-[60%] lg:block relative'>
            <img className='w-full h-full ' src={loginImg} alt="" />
            <div className='w-full h-full backdrop-blur-md bg-black/30 bg-black absolute top-0 left-0'>

            </div>
           </div>

           <Toaster position='top-center' reverseOrder={false}/>
        </div>
    </div>
    );
};

export default SignUp;
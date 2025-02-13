import React from 'react';
import person from '../../../../assets/image/banner/person.png'
import './banner.css';
const BannerA = () => {
    return (
        <div className=' w-full h-[50vh] lg:h-[100vh] flex items-center justify-center relative '>
            <h1 className='uppercase font-bold lg:text-[230px] text-gray-300 tracking-[50px] '>TBD</h1>

            <div className='w-full h-full  absolute '>
                <div className=' w-full h-full'>
                    <div className='banner-bgImage w-full h-full flex items-center justify-center'>
                        <h2 className='text-[110px] lg:text-[250px] font-extrabold leading-tight'>TRAVEL</h2>
                    </div>

                    <img className='absolute top-0 lg:left-[28%] w-[550px]' src={person} alt="" />
                    <h2 className='sub-title-text text-[50px] lg:text-[100px] absolute lg:left-[20%] bottom-0 text-orange-500'>Know Before You GO</h2>
                   
                    <div className="absolute  animate-bounce left-[40%] lg:left-[50%] bottom-[-70px] lg:bottom-[-10px] flex flex-col items-center ">
                        <svg
                            className="w-8 h-8 text-orange-500"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                        </svg>
                        <span className='text-xs text-orange-500'>scroll Down</span>
                    </div>
                </div>
            </div>

            


        </div>
    );
};

export default BannerA;
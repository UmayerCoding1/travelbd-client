import React from 'react';

const HeroSkeleton = () => {
    
    return (
        <div className=" flex gap-2  my-10">
            <div className='w-full lg:w-1/2'>
            <div className="flex items-center gap-2 ">
                <div className="skeleton h-14 w-56"></div>
                <div className="skeleton h-10 w-10"></div>
            </div>

            <div className='mt-5'>
            <div className="skeleton h-8 w-full"></div>
            <div className="skeleton mt-3 h-8 w-1/2"></div>

            <div className="skeleton mt-3 h-4 w-full"></div>
            <div className="skeleton mt-3 h-4 w-full"></div>
            <div className="skeleton mt-3 h-4 w-full"></div>
            </div>

            <div className='mt-10 flex items-center gap-5'>
                <div className='flex gap-2'>
              <div className="skeleton rounded-none h-3 w-3"></div>
              <div className="skeleton  h-3 w-10"></div>
                </div>

                <div className='flex gap-2'>
              <div className="skeleton rounded-none h-3 w-3"></div>
              <div className="skeleton  h-3 w-10"></div>
                </div>
            </div>


            <div className='mt-4'>
            <div className="skeleton h-14 w-full"></div>
            </div>
           </div>

           <div className='w-1/2 hidden lg:flex gap-5'>
           <div className="skeleton h-[90%] w-52"></div>
           <div className="skeleton mt-5 w-52"></div>
           <div className="skeleton mt-10 w-52"></div>
           </div>
           
        </div>
    );
};

export default HeroSkeleton;
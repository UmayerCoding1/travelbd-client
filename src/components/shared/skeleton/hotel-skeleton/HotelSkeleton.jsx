import React from 'react';

const HotelSkeleton = () => {
  return (
    <div className='flex gap-4 w-full h-full'>
      <div className="skeleton h-[500px] w-[25%] hidden lg:block"></div>


      <div className="w-full lg:w-[75%]  gap-4 p-2">
        <div className='lg:flex gap-3 w-full my-3'>
          <div className="skeleton h-[230px] lg:w-[35%]"></div>
          <div className='flex flex-col gap-2 mt-2'>
            <div className="skeleton h-4 lg:w-[600px]"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
        </div>

        <div className='lg:flex gap-3 w-full'>
          <div className="skeleton h-[230px] lg:w-[35%]"></div>
          <div className='flex flex-col gap-2 mt-2'>
            <div className="skeleton h-4 lg:w-[600px]"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HotelSkeleton;
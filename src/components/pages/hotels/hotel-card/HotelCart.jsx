import React, { useEffect, useState } from 'react';
import ImageSlider from '../../../shared/image-slider/ImageSlider';
import { CloseIcon, LocationIcon, RightArrowIcon, SelectIcon } from '../../../../provider/IconProvider';
import Favorite from '../../../shared/favorite/Favorite';
import { Link } from 'react-router';
// import './ho.css'
const HotelCart = ({ hotel,searchdata }) => {
  const { hotelName, hotelType, location, nearby, couple, amenities, hotelImage, star, rooms, pricing, duration, onlinePayment, _id } = hotel;
  const { discount, price, texes } = pricing;
  const discountAmount = parseInt((price * discount) / 100);

  const review = 1000 //todo: add a field  to review from hotel data
  //
  return (
    
      <div className='mb-3 shadow-primaryShadow p-2 lg:flex gap-2 w-full '>
        <div onClick={(e) => e.stopPropagation()} className='w-full lg:w-[35%] h-[230px] lg:h- bg-emerald-50 relative'>
          <ImageSlider image={hotelImage} imageTitle={hotelName} style={'w-full   h-[230px] '} />
          {/* <Favorite style={'absolute left-1 bottom-1 z-10'} /> */}
        </div>

        <div className='mt-2'>
          <div>
            <h2 className='text-xl font-[700] font-bodyTextFontRaleway text-Headings'>{hotelName}</h2>
            <div className='flex items-center gap-2 text-sm mt-1'>
              <button className='bg-Headings text-white px-3  rating-btn rounded-tl-[10px] rounded-tr-none rounded-b-[10px] '><span>{star}.0</span> <span className='text-sm'>/</span> <span className='text-gray-300'>5</span></button>
              <p className='text-sm'>{review.toLocaleString()} <span>Review</span></p>
            </div>

            <p className='text-Headings text-sm flex items-start gap-2 mt-2'><LocationIcon className='mt-1' /> {location}</p>
          </div>


          <div className='rounded-lg p-3 pb-0 mt-3 flex'>
            <div className=' '>
              <p className='text-sm text-[#e2458e] font-semibold border border-[#e2458e] inline-block p-2 rounded-lg'>{rooms?.length} Rooms Remaining</p>


              <div className='mt-2 lg:mt-0'>
                {amenities?.map((item, i) => <span key={i} className='text-sm font-medium p-[2px] mr-2 underline  block lg:inline-block'>{item}</span>)}
              </div>

              <p className={`${couple ? 'border-2 border-green-500  text-green-500' : 'border-2 border-red-500 text-red-500'}  text-sm  w-[130px] text-center p-1 mt-2 rounded-xl font-medium flex items-center gap-1`}>Couple Friendly {couple ? <SelectIcon /> : <CloseIcon />}</p>
            </div>


            <div className=' w-[65%]  flex justify-end items-end flex-col'>
              <div className='bg-Headings text-white text-sm text-center p-1 rounded-tl-[10px]  rounded-b-[10px] '>{discount}% OFF</div>

              <p className={`text-[10px] ${onlinePayment ? 'text-emerald-500' : 'text-red-500'}`}>{onlinePayment ? 'Online payment is available' : 'Online payment is not available'}</p>

              <p className="text-red-500  text-lg  relative after:content-[''] after:w-[93px] after:h-[1.5px] after:bg-red-500  after:absolute after:left-[-3px] after:top-[45%] after:rotate-[-5.5deg] ">BDT {price.toLocaleString()}</p>

              <p className='text-xl font-semibold text-Headings'>৳ {discountAmount.toLocaleString()}</p>
              <p className='text-[10px] font-medium'>for {duration}, pre room</p>
              <p className='text-sm'>Total taxes: BTD {texes}</p>


             <Link to={`/to/hotel/${_id}/hotel-deatils?bookingInfo=${searchdata}`}>
              <div>
                <button className=' bg-primaryColor text-white mt-2 rounded-lg text-[13px] font-medium w-44 h-10  flex items-center justify-center gap-1 p-1'>Check Availability <RightArrowIcon /></button>
              </div>
             </Link>
              

            </div>
          </div>
        </div>
      </div>
    
  );
};

export default HotelCart;
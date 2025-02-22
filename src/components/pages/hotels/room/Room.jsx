import React, { useState } from 'react';
import { FaBed } from "react-icons/fa6";
import { GiWindow } from "react-icons/gi";
import { CloseIcon, SelectIcon } from '../../../../provider/IconProvider';
import RoomDetails from './RoomDetails';
import { Link } from 'react-router';
const Room = ({ room, handleShoeRoomDetails }) => {
  const { title, bad, catering, available, discount, price, roomImage, roomView, texes, _id } = room;
  const discountAmount = parseInt((price * discount) / 100);

  // console.log(room._id);




  return (
    <div className='shadow-primaryShadow rounded-lg p-2  my-2'>
      <div className='w-full flex justify-between gap-2 '>
        <div className='w-full flex gap-3'>
          <div className='relative cursor-pointer'>
            <img onClick={() => handleShoeRoomDetails(_id)} className='w-40 h-full rounded-lg' src={roomImage[0]} alt="" />
            <p className='bg-black text-xs text-white p-1 w-7 h-7 text-center rounded-full absolute right-0 bottom-0'>
              {roomImage?.length}
            </p>
          </div>

          <div>
            <h2 className='text-xl font-semibold'>{title}</h2>
            <div className='flex gap-4'>
              <span className='flex items-center gap-1 text-xs mt-2'><FaBed />{bad}</span>
              <span className='flex items-center gap-1 text-xs mt-2'><GiWindow /> {roomView}</span>
            </div>

            <div className='flex items-center gap-2'>
              {catering.morning ? <span className={`flex items-center gap-1 text-emerald-500 text-xs font-medium`}>Breakfast <SelectIcon /></span> : <span className='flex items-center gap-1  text-red-500 font-medium text-xs'>Breakfast <CloseIcon /></span>}
              {catering.lunch ? <span className={`flex items-center gap-1 text-emerald-500 text-xs font-medium`}>Lunch <SelectIcon /></span> : <span className={`flex items-center gap-1 text-red-500 font-medium text-xs `}>Lunch <CloseIcon /></span>}
              {catering.dinner ? <span className={`flex items-center gap-1 text-emerald-500 text-xs font-medium`}>Dinner <SelectIcon /></span> : <span className={`flex items-center gap-1 text-red-500 font-medium text-xs `}>Dinner <CloseIcon /></span>}
            </div>
            <p className={`mt-1 text-xs ${available >= 3 ? 'text-emerald-500' : 'text-red-500'} font-medium`}>Hurry Up! Only {available} Rooms Left</p>
            <p onClick={() => handleShoeRoomDetails(_id)} className='text-xs mt-2 text-blue-500 underline cursor-pointer'>Room Details</p>
          </div>
        </div>



        <div className='hidden lg:flex flex-col w-full' >
          <div className='w-full     flex justify-end items-end flex-col'>
            <div className='bg-Headings text-white text-xs text-center p-1 rounded-tl-[10px]  rounded-b-[10px] '>{discount}% OFF</div>
            <p className="text-red-500  text-lg  relative after:content-[''] after:w-[93px] after:h-[1.5px] after:bg-red-500  after:absolute after:left-[-3px] after:top-[45%] after:rotate-[-5.5deg] ">BDT {price.toLocaleString()}</p>
            <p className='text-xl font-semibold text-Headings'>৳ {discountAmount.toLocaleString()}</p>

            <p className='text-xs'>Total taxes: BTD {texes}</p>


            <button className='bg-primaryColor w-28 h-8 text-white text-xs tracking-widest rounded-lg  mt-3'>Select 1 room</button>

          </div>
        </div>
      </div>

      <div className='lg:hidden mt-2'>
        <div className='w-full     flex items-end justify-between '>
          <div>
            <div className='bg-Headings text-white text-xs text-center p-1 rounded-tl-[10px]  rounded-b-[10px] '>{discount}% OFF</div>
            <p className="text-red-500  text-lg  relative after:content-[''] after:w-[93px] after:h-[1.5px] after:bg-red-500  after:absolute after:left-[-3px] after:top-[45%] after:rotate-[-5.5deg] ">BDT {price.toLocaleString()}</p>
            <p className='text-xl font-semibold text-Headings'>৳ {discountAmount.toLocaleString()}</p>

            <p className='text-xs'>Total taxes: BTD {texes}</p>
          </div>


          <button className='bg-primaryColor w-28 h-8 text-white text-xs tracking-widest rounded-lg  mt-3'>Select 1 room</button>

        </div>
      </div>

    </div>
  );
};

export default Room;
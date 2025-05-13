import React from 'react';
import ImageSlider from '../../../shared/image-slider/ImageSlider';
import { FaBed } from "react-icons/fa6";
import { GiWindow } from "react-icons/gi";
import { CloseIcon, GroupIcon, SelectIcon } from '../../../../provider/IconProvider';
const RoomDetails = ({ roomData, setOpenRoomDetails, setPrevScrollY }) => {
  const { title, bad, catering, people, RoomCapacity, available, discount, facilities, price, roomCharacteristics, roomImage, roomType, roomView, texes, _id } = roomData;
  
  return (
    <div className='w-full h-full bg-white lg:bg-[#00000057] absolute top-20 lg:top-0 left-0 z-10  lg:flex items-center justify-center font-bodyTextFontRaleway'>
      <div className='w-full lg:w-[75%] lg:h-[550px] lg:bg-white mt-5 p-2 rounded-lg relative'>

        <div className='hidden lg:flex gap-2 overflow-hidden  '>
          <div className='w-[68%] max-h-[530px] border-r-2 overflow-auto grid grid-cols-2 gap-2 '>
            {roomImage?.map((img, i) => <img className='w-full h-[300px]' key={i} src={img} />)}
          </div>

          <div className='w-[32%] overflow-auto max-h-[530px]'>
            <div className='bg-[#EBF0F4] w-full p-1 pl-2 rounded-lg font-semibold text-Headings'>Room Details</div>

            <div>
              <div className='text-gray-500'>
                <h2 className='text-Headings font-bold text-lg mt-2'>{title}</h2>

                <div className='flex items-center  gap-1 text-sm mt-2'>
                  <span><FaBed /></span>
                  <span>{bad}</span>
                </div>

                <div className='flex items-center gap-1 text-sm '>
                  <span><GroupIcon /></span>
                  <span>{people.adults} adults , {people.children} children</span>
                </div>
                <div className='flex items-center gap-2 mt-1'>
                  {catering.morning ? <span className={`flex items-center gap-1 text-emerald-500 text-sm font-medium`}>Breakfast <SelectIcon /></span> : <span className='flex items-center gap-1  text-red-500 font-medium text-sm'>Breakfast <CloseIcon /></span>}
                  {catering.lunch ? <span className={`flex items-center gap-1 text-emerald-500 text-sm font-medium`}>Lunch <SelectIcon /></span> : <span className={`flex items-center gap-1 text-red-500 font-medium text-sm `}>Lunch <CloseIcon /></span>}
                  {catering.dinner ? <span className={`flex items-center gap-1 text-emerald-500 text-sm font-medium`}>Dinner <SelectIcon /></span> : <span className={`flex items-center gap-1 text-red-500 font-medium text-sm `}>Dinner <CloseIcon /></span>}
                </div>
              </div>
              <hr className='mt-4 border-gray-300' />

              <div className='flex mt-2'>
                <div className='w-1/2'>
                  <h2 className='text-sm font-semibold text-Headings mt-1'>Room type : <span className='font-normal text-gray-600'>{roomType}</span></h2>
                  <h2 className='text-sm font-semibold text-Headings mt-1'>Room Characteristics : <span className='font-normal text-gray-600'>{roomCharacteristics}</span></h2>
                  <h2 className='text-sm font-semibold text-Headings mt-1'>Room View : <span className='font-normal text-gray-600'>{roomView}</span></h2>
                </div>

                <div className='w-1/2'>
                  <h2 className='text-sm font-semibold text-Headings mt-1'>Non-Smoking Room</h2>
                  <h2 className='text-sm font-semibold text-Headings mt-1'>Room Capacity : <span className='font-normal text-gray-600'>{RoomCapacity}</span></h2>
                  <h2 className='text-sm font-semibold text-Headings mt-1'>Room Size : <span className='font-normal text-gray-600'>None</span></h2>
                </div>
              </div>
              <hr className='mt-4 border-gray-300' />

              <div className='mt-2'>
                <h2 className='text-xl font-semibold'>Facilities</h2>
                <div className='grid grid-cols-2'>
                  {facilities?.map((facilitie) => {
                    const { category, item, _id } = facilitie;
                    return ([
                      <div key={_id} className='mt-3'>
                        <h3 className='text-Headings font-medium'>{category}</h3>
                        <ul className='mt-2 mb-2 ml-3'>
                          {item?.map((item, i) => <li key={i} className='text-sm mt-1 text-gray-600'>{item}</li>)}
                        </ul>
                      </div>
                    ])
                  })}
                </div>
              </div>
            </div>

          </div>
          <button onClick={() => {
            setOpenRoomDetails(false)
            setPrevScrollY(920);
          }} className='absolute top-[-15px]  left-[-10px] text-2xl hidden p-2 rounded-full lg:block lg:glass'><CloseIcon /></button>
        </div>


        <div className='lg:hidden '>
          <ImageSlider image={roomImage} style={'w-full h-[230px]'} />
        </div>

        <div className='lg:hidden mt-2 max-h-[550px] overflow-auto'>
          <div className='bg-[#EBF0F4] w-full p-1 pl-2 rounded-lg font-semibold text-Headings'>Room Details</div>
          <div>
              <div className='text-gray-500'>
                <h2 className='text-Headings font-bold text-lg mt-2'>{title}</h2>

                <div className='flex items-center  gap-1 text-sm mt-2'>
                  <span><FaBed /></span>
                  <span>{bad}</span>
                </div>

                <div className='flex items-center gap-1 text-sm '>
                  <span><GroupIcon /></span>
                  <span>{people.adults} adults , {people.children} children</span>
                </div>
                <div className='flex items-center gap-2 mt-1'>
                  {catering.morning ? <span className={`flex items-center gap-1 text-emerald-500 text-sm font-medium`}>Breakfast <SelectIcon /></span> : <span className='flex items-center gap-1  text-red-500 font-medium text-sm'>Breakfast <CloseIcon /></span>}
                  {catering.lunch ? <span className={`flex items-center gap-1 text-emerald-500 text-sm font-medium`}>Lunch <SelectIcon /></span> : <span className={`flex items-center gap-1 text-red-500 font-medium text-sm `}>Lunch <CloseIcon /></span>}
                  {catering.dinner ? <span className={`flex items-center gap-1 text-emerald-500 text-sm font-medium`}>Dinner <SelectIcon /></span> : <span className={`flex items-center gap-1 text-red-500 font-medium text-sm `}>Dinner <CloseIcon /></span>}
                </div>
              </div>
              <hr className='mt-4 border-gray-300' />

              <div className='flex mt-2'>
                <div className='w-1/2'>
                  <h2 className='text-sm font-semibold text-Headings mt-1'>Room type : <span className='font-normal text-gray-600'>{roomType}</span></h2>
                  <h2 className='text-sm font-semibold text-Headings mt-1'>Room Characteristics : <span className='font-normal text-gray-600'>{roomCharacteristics}</span></h2>
                  <h2 className='text-sm font-semibold text-Headings mt-1'>Room View : <span className='font-normal text-gray-600'>{roomView}</span></h2>
                </div>

                <div className='w-1/2'>
                  <h2 className='text-sm font-semibold text-Headings mt-1'>Non-Smoking Room</h2>
                  <h2 className='text-sm font-semibold text-Headings mt-1'>Room Capacity : <span className='font-normal text-gray-600'>{RoomCapacity}</span></h2>
                  <h2 className='text-sm font-semibold text-Headings mt-1'>Room Size : <span className='font-normal text-gray-600'>None</span></h2>
                </div>
              </div>
              <hr className='mt-4 border-gray-300' />

              <div className='mt-2'>
                <h2 className='text-xl font-semibold'>Facilities</h2>
                <div className='grid grid-cols-2'>
                  {facilities?.map((facilitie) => {
                    const { category, item, _id } = facilitie;
                    return ([
                      <div key={_id} className='mt-3'>
                        <h3 className='text-Headings font-medium'>{category}</h3>
                        <ul className='mt-2 mb-2 ml-3'>
                          {item?.map((item, i) => <li key={i} className='text-sm mt-1 text-gray-600'>{item}</li>)}
                        </ul>
                      </div>
                    ])
                  })}
                </div>
              </div>
            </div>
        </div>
      </div>

      <button onClick={() => {
        setOpenRoomDetails(false)
        setPrevScrollY(920);
      }} className='absolute top-[-15px] right-1 text-2xl bg-white shadow-primaryShadow p-2 rounded-full lg:hidden'><CloseIcon /></button>
    </div>
  );
};

export default RoomDetails;
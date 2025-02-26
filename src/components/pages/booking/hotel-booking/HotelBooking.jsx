import React, { useState } from 'react';
import {  useLocation } from 'react-router';


const HotelBooking = ({ hotels }) => {
  const { state } = useLocation();
  const { hotelId, roomName, chackIn, chackOut, room, adults, children } = state;
  const selectedHotel = hotels?.find(hotel => hotel._id === hotelId && hotelId);
  const selectedRoom = selectedHotel?.rooms?.find(room => room.title === roomName);
  const adultsFields = Array.from({ length: parseInt(adults) }, (_, index) => index + 1);
  const childrenFiled = Array.from({ length: parseInt(children) }, (_, index) => index + 1);
  const adultsCount = parseInt(adults);
  const childrenCount = parseInt(children);
  

  const createDate = (date) => {
    const [day, month, year] = date.split("-").map(Number);
    const convertDate = new Date(year, month - 1, day);
    return convertDate;
  }


  const calculateNight = (checkIn, checkOut) => {
    if (checkOut <= checkIn) return 0;
    const diffTime = checkOut - checkIn;
    const nights = diffTime / (1000 * 60 * 60 * 24);
    return nights;
  }


  const checkInDate = (createDate(chackIn));
  const checkOutDate = (createDate(chackOut));
  const night = calculateNight(checkInDate, checkOutDate);


  const formattedCheckInDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric"
  }).format(checkInDate);
  const formattedCheckOutDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric"
  }).format(checkOutDate);

  const [formData, setFormData] = useState({
    adults: Array.from({ length: adultsCount }, () => ({ name: "", contact: "" })),
    children: Array.from({ length: childrenCount }, () => ({ name: "", age: "" }))
  });

  console.log(selectedRoom);
  const handleInputValue = (index, type, filedName, value) => {
    setFormData((prev) => {
      const updateedData = { ...prev };
      updateedData[type][index] = { ...updateedData[type][index], [filedName]: value };
      return updateedData;
    })
  }

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    

    
    console.log(Object.values(formData));
  }
  return (
    <div className=''>
      <div className='flex flex-col gap-x-2 lg:flex-row'>
        <div className='w-full lg:w-[70%] h-auto   order-2 lg:order-1 bg-white p-2 shadow-xl rounded-xl'>
          <h2 className='text-2xl font-semibold text-Headings font-bodyTextFontLato'>Guest Details</h2>

          <form className='p-5 lg:p-2' onSubmit={handleBookingSubmit}>
            <div>
              <h2 className='text-xl font-medium uppercase border-b border-gray-600'>Adults</h2>
              {adultsFields.map((_, index) => (
                <div key={index} className='mt-1'>
                  <label className='text-xs uppercase font-semibold' htmlFor="adults">Adult <span>{index + 1}</span></label> <br />
                  <div className="mb-4 w-full  lg:flex gap-x-2">
                    <div className='mt-2 lg:mt-0   lg:w-1/2'>
                      <input type="text"
                        name={`adult-${index + 1}-name}`}
                        id={`adult-${index + 1}`}
                        placeholder={`Adult ${index + 1} name`}
                        className='w-full h-10 bg-gray-100 pl-2 rounded-lg text-xs outline-none border-[1.5px] border-gray-500'
                        onChange={(e) => handleInputValue(index, 'adults', 'name', e.target.value)}
                        required
                      />
                    </div>

                    <div className='mt-2 lg:mt-0   lg:w-1/2'>
                      <input type="number"
                        name={`adult-${index + 1}-contact}`}
                        id={`adult-${index + 1}`}
                        placeholder={`Adult ${index + 1} contact`}
                        className='w-full h-10 bg-gray-100 pl-2 rounded-lg text-xs outline-none border-[1.5px] border-gray-500'
                        onChange={(e) => handleInputValue(index, 'adults', 'contact', e.target.value)}
                        required
                      />
                    </div>

                  </div>
                </div>
              ))}
            </div>

            <div>
              <h2 className={`text-xl font-medium uppercase border-b border-gray-600 ${childrenFiled <= 0 && 'hidden'}`}>Children</h2>
              {childrenFiled?.map((_, index) => (
                <div key={index} className='mt-1'>
                  <label className='text-xs uppercase font-semibold' htmlFor="adults">Children <span>{index + 1}</span></label> <br />
                  <div className="mb-4 w-full  lg:flex gap-x-2">
                    <div className='mt-2 lg:mt-0   lg:w-1/2'>
                      <input type="text"
                        name={`adult-${index + 1}-name}`}
                        id={`adult-${index + 1}`}
                        placeholder={`Adult ${index + 1} name`}
                        className='w-full h-10 bg-gray-100 pl-2 rounded-lg text-xs outline-none border-[1.5px] border-gray-500'
                        onChange={(e) => handleInputValue(index, 'children', 'name', e.target.value)}
                        required
                      />
                    </div>

                    <div className='mt-2 lg:mt-0   lg:w-1/2'>
                      <input type="number"
                        name={`chaildren-${index + 1}-age}`}
                        id={`chaildren-${index + 1}`}
                        placeholder={`chaildren ${index + 1} age`}
                        className='w-full h-10 bg-gray-100 pl-2 rounded-lg text-xs outline-none border-[1.5px] border-gray-500'
                        onChange={(e) => handleInputValue(index, 'children', 'age', e.target.value)}
                        required
                      />
                    </div>

                  </div>
                </div>
              ))}
            </div>


            <div>
              <div className='hidden lg:block'>
                <button className='w-full bg-primaryColor h-10 rounded-lg text-xs font-semibold text-white '>Confirm Booking</button>
              </div>

              <div className='lg:hidden fixed left-0 bottom-0 w-full '>
                <button className='w-full bg-primaryColor h-10  text-xs font-semibold text-white '>Confirm Booking</button>
              </div>
            </div>

          </form>
        </div>


        <div className='w-full lg:w-[30%] lg:h-[430px]  order-1 p-2 lg:order-2  bg-white  shadow-xl   rounded-xl'>
          <div className='flex gap-x-2'>
            <img className='w-16 h-16' src={selectedHotel?.hotelImage[0]} alt="" />
            <div>
              <h2 className='text-lg font-medium'>{selectedHotel?.hotelName}</h2>
              <p className='text-[10px] text-Headings/100'>{selectedHotel?.location}</p>
            </div>
          </div>
          <hr className='mt-2' />

          <div className='mt-2'>
            <h2 className='text-xl font-medium'>Fare Summary</h2>
            <div className='flex items-center justify-between mt-2'>
              <div>
                <p className='text-[10px] mt-2 text-gray-500 font-medium'>Check In</p>
                <p className='font-medium'>{formattedCheckInDate}</p>
              </div>
              <div>
                <p className='text-[10px] mt-2 text-gray-500 font-medium'>Check In</p>
                <p className='font-medium'>{formattedCheckOutDate}</p>
              </div>

              <p className='font-medium text-gray-500'>{night} Nigth</p>
            </div>
          </div>
          <hr className='mt-2' />
          <p className='font-bodyTextFontRaleway font-bold text-gray-500 mt-2'>{selectedRoom?.title} <span>({adults} Adults)</span></p>
          <hr className='mt-2' />


          <div className='w-full mt-4'>
            <div className='w-full h-9 flex items-center justify-between'>
              <p className='text-xs flex gap-1'>
                <span>{room} room</span>
                <span>x</span>
                <span>{night} night</span>
              </p>

              <p className='text-[15px]'>
                <span className='font-medium'>BTD </span>
                <span className='text-gray-600'>{((room * night) * selectedRoom?.price).toLocaleString()}</span>
              </p>
            </div>

            <div className='w-full h-9 flex items-center justify-between'>
              <p className='text-xs flex items-center gap-1'>
                <span>Special Discount</span>
                <span className='bg-Headings text-white text-[10px] p-1 rounded-lg'>{selectedRoom?.discount}%</span>
              </p>

              <p className='text-[15px]'>
                <span className='font-medium text-lg text-red-500'>- BTD </span>
                <span className='text-gray-600'>{((parseInt((selectedRoom?.price * selectedRoom?.discount) / 100))).toLocaleString()}</span>
              </p>
            </div>
            <div className='w-full h-9 flex items-center justify-between'>
              <p className='text-xs flex items-center gap-1'>
                <span>Taxes</span>
              </p>

              <p className='text-[15px]'>
                 <span className='font-medium '>+ BTD </span>
                <span className='text-gray-600'>{selectedRoom?.texes.toLocaleString()}</span>
              </p>
            </div>
            <hr className='mt-2'/>

            <div className='p-2 flex items-center justify-between bg-Headings text-white '>
              <p className='font-medium'>
                <span>Pay Now</span>
              </p>

              <p className='flex items-center gap-1 text-xl font-semibold'>
                <span>BTD</span>
                <span>
                  {parseInt(((room * night) * selectedRoom?.price) - ((selectedRoom?.price * selectedRoom?.discount) / 100) + selectedRoom?.texes).toLocaleString()}
                </span>
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HotelBooking;
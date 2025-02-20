import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import ImageSlider from '../../../shared/image-slider/ImageSlider';
import { Rating } from '@mui/material';
import { CloseIcon, LocationIcon } from '../../../../provider/IconProvider';
import Carousel from '../../../shared/image-slider/carousel/Carousel';

const HotelDetails = () => {
  const [openImageGallery, setOpenImageGallery] = useState(false)
  const { data } = useLoaderData();
  const { hotelName, hotelType, location, nearby, couple, amenities, hotelImage, star, rooms, pricing, duration, onlinePayment, _id } = data;
  console.log(data);
  return (
    <div className='max-w-6xl mx-auto font-bodyTextFontLato mt-4 '>

      <div className='hidden lg:flex items-center justify-between mb-2'>
        <div>
          <div className='flex items-center gap-3'>
            <h2 className='text-3xl text-Headings font-bold'>{hotelName}</h2>
            <Rating
              value={star}
              readOnly
            />
            {star >= 3 && <span className='bg-Headings text-white font-medium p-1 rounded-2xl rounded-tr-none'>{star >= 3 && 'Good'}</span>}
          </div>
          <p className='flex items-center text-xs text-Headings/90 mt-2 font-medium'><LocationIcon /> {location}</p>
        </div>

        <div>
          <button className='bg-primaryColor text-white  p-3 rounded-lg font-medium'>Select Room</button>
        </div>

      </div>

      <div className='hidden lg:block'>
        <div className="grid grid-cols-4 grid-rows-2 gap-1 w-full h-[500px] ">
          {hotelImage?.slice(0, 5).map((img, i) => (
            <div
              key={i}
              className={`
        ${i === 0 ? 'col-span-2 row-span-2 w-full h-full' : 'w-full h-full'}
        relative overflow-hidden rounded-lg
      `}
            >
              <img
                src={img}
                alt={`Hotel ${i}`}
                className="w-full h-full object-cover rounded-lg"
              />
              {i === 4 && hotelImage.length > 5 && (
                <div onClick={() => setOpenImageGallery(true)} className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-lg font-semibold cursor-pointer">
                  +{hotelImage.length - 5} Photos
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <ImageSlider image={hotelImage} style={'w-full h-[230px] lg:hidden'} />


      {openImageGallery && <div className='w-full h-full bg-[#262626c3] absolute top-0 left-0 p-2 overflow-hidden'>
        <div className=''>
          <h2 className=' text-white text-center'><span className='font-semibold uppercase'>Hotel</span> <br /> <span className='text-xs'>{hotelName}</span> </h2>
          
          <CloseIcon onClick={() => setOpenImageGallery(false)} className='text-3xl text-white cursor-pointer absolute top-2 right-3' />
        </div>

        <div className='mt-5'>
          <Carousel slides={hotelImage} />
        </div>
      </div>}


    </div>
  );
};

export default HotelDetails;
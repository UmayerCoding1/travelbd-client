import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import ImageSlider from '../../../shared/image-slider/ImageSlider';
import { Rating } from '@mui/material';
import { CloseIcon, LocationIcon } from '../../../../provider/IconProvider';
import Carousel from '../../../shared/image-slider/carousel/Carousel';
import { Helmet } from 'react-helmet';
import Favorite from '../../../shared/favorite/Favorite';
import { FaSnowflake, FaSignInAlt, FaBath, } from "react-icons/fa";
import { GiElevator } from "react-icons/gi";
import { MdChair } from "react-icons/md";
import { FaTreeCity } from "react-icons/fa6";
import { IoIosInformationCircleOutline as InfoIcon } from "react-icons/io";
import parkingImg from '../../../../assets/image/parking.png';
import Room from '../room/Room';
import RoomDetails from '../room/RoomDetails';

const HotelDetails = () => {
  const [openImageGallery, setOpenImageGallery] = useState(false);
  const [openDescription, setOpenDescription] = useState(false);
  const [openRoomDetails, setOpenRoomDetails] = useState(false);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [tabStatus, setTabStatus] = useState('rooms');
  const [selectedRoomDetails, setSelectedRoomDetails] = useState({});
  const { data } = useLoaderData();
  const { hotelName, hotelType, location, nearby, couple, amenities, hotelImage, star, rooms, pricing, duration, onlinePayment, numberOfFloors, numberOfRooms, yearOfConstruction, description, _id } = data;

  const handleShoeRoomDetails = (id) => {
    const selectedRoom = rooms.find(room => room._id === id);
    setSelectedRoomDetails(selectedRoom);
    setOpenRoomDetails(true);
  }




  useEffect(() => {
    if (openImageGallery || openRoomDetails) {
      document.body.style.overflow = 'hidden';
      document.body.style.top = `-${0}px`;
      document.body.style.position = 'fixed';
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.position = '';
    }

    if (prevScrollY > 0) {
      window.scrollTo(0, 920);
    }
  }, [openImageGallery, openRoomDetails]);





  if (!data) {
    return <span>a</span>;
  }

  return (
    <div className='max-w-6xl mx-auto font-bodyTextFontLato mt-4 '>
      <Helmet>
        <title>{hotelName} | Trevel BD</title>
      </Helmet>

      <div className='hidden lg:flex items-center justify-between mb-2'>
        <div>
          <div className='flex items-center gap-3'>
            <h2 className='text-3xl text-Headings font-bold'>{hotelName}</h2>
            <Rating
              value={star}
              readOnly
            />

          </div>
          <p className='flex items-center text-xs text-Headings/90 mt-2 font-medium'><LocationIcon /> {location}</p>
        </div>

        {/* <div>
          <button className='bg-primaryColor text-white  p-3 rounded-lg font-medium'>Select Room</button>
        </div> */}
        <Favorite />

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
                className="w-full h-full object-cover rounded-lg   hover:scale-110 transition-all duration-200 ease-out"
                loading='lazy'
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

      <div className=' flex items-center justify-between mb-2 mt-2 lg:mt-0 lg:hidden p-1'>
        <div>
          <div className='flex items-center gap-3'>
            <h2 className='text-lg text-Headings font-bold'>{hotelName}</h2>
            <Rating
              sx={{ fontSize: "16px" }}
              value={star}
              readOnly
            />

            <Favorite />
          </div>
          <p className='flex items-center text-xs text-Headings/90 mt-2 font-medium'><LocationIcon /> {location}</p>
        </div>
      </div>


      <div className='h-screen lg:flex mt-3'>

        <div className='lg:w-[75%] lg:p-2'>
          <div>
            <h2 className='text-xl font-bodyTextFontRaleway font-semibold text-Headings'>Amenities</h2>
            <div className=''>
              {amenities?.map((item, i) => <p key={i} className='mr-2 inline-block '>
                <span className='flex items-center p-2  gap-2 mb-1'>
                  <span className='text-2xl'>
                    {item === 'Air Conditioning' && <FaSnowflake /> || item === 'Check-In Check-Out' && <FaSignInAlt /> || item === 'Accessible Bathroom' && <FaBath /> || item === 'Elevator' && <GiElevator /> || item === 'Highchairs' && <MdChair />}
                  </span>
                  <span className='text-xs'>{item}</span>
                </span>
              </p>)}
            </div>
          </div>

          <div className='mt-3'>
            <div className='lg:flex justify-c'>
              <div className='w-full lg:w-1/2'>
                <h2 className='text-xl font-bodyTextFontRaleway font-semibold flex items-center gap-1 text-Headings'><FaTreeCity /> Surroundings</h2>
                {nearby?.map((item, i) => <span key={i} className='flex items-center gap-1 my-2'>
                  <span><LocationIcon className='text-xl' /></span>
                  <span className='text-xs text-gray-600'>{item}</span>
                </span>)}
              </div>

              <div>
                <h2 className='text-xl font-bodyTextFontRaleway font-semibold flex items-center gap-1 text-Headings'>Highlights</h2>
                <div className='bg-[#F5F7FA] p-2 h-24 lg:w-48 lg:h-28 rounded-lg mt-3 flex flex-col items-center justify-center relative '>
                  <img className='w-10' src={parkingImg} alt="" />
                  <p className='flex items-center gap-1'>
                    Free parking
                    <span className=" group">
                      <InfoIcon className='cursor-pointer' />
                      <span className='absolute text-xs bg-black w-[250px] px-2 h-10 text-white text-center  items-center justify-cente  hidden group-hover:flex'>You can park at this property for free</span>
                    </span>
                  </p>

                </div>
              </div>
            </div>
          </div>


          <div className='mt-3'>
            <h2 className='text-xl font-bodyTextFontRaleway font-semibold text-Headings '>Hotel Descriptions</h2>
            <div className='p-1'>
              <div className='lg:flex items-center  gap-5 mt-2 '>
                <h2 className='text-lg font-medium'>Number of Floors : {numberOfFloors}</h2>
                <h2 className='text-lg font-medium'>Number of Rooms : {numberOfRooms}</h2>
                <h2 className='text-lg font-medium'> Year of construction : {yearOfConstruction}</h2>
              </div>
              <p className={`${openDescription ? 'h-auto' : 'h-10'} mt-2 w-full  overflow-hidden text-xs leading-relaxed font-bodyTextFontRaleway font-medium `}>{description}</p>
              <button onClick={() => setOpenDescription(!openDescription)} className='text-xs text-blue-500 select-none cursor-pointer'>See {openDescription ? 'less' : 'more'}</button>
            </div>
          </div>

          <div className='mt-7 w-full  shadow-primaryShadow p-2'>
            <ul className='flex items-center gap-6'>
              <li onClick={() => setTabStatus('rooms')} className={`text-lg font-bold font-bodyTextFontRaleway relative cursor-pointer ${tabStatus === 'rooms' && "after:content-[''] after:w-10 after:h-[3px] after:bg-Headings after:absolute after:top-full after:left-2"}`}>Rooms</li>

              <li onClick={() => setTabStatus('review')} className={`text-lg font-bold font-bodyTextFontRaleway relative cursor-pointer ${tabStatus === 'review' && "after:content-[''] after:w-10 after:h-[3px] after:bg-Headings after:absolute after:top-full after:left-2"}`}>Review</li>

            </ul>
            <hr className='border-black' />


            {tabStatus === 'rooms' && <div>
              {rooms?.map((room, i) => <Room key={i} room={room} handleShoeRoomDetails={handleShoeRoomDetails} />)}
            </div>}
            {openRoomDetails && <RoomDetails roomData={selectedRoomDetails} setOpenRoomDetails={setOpenRoomDetails} setPrevScrollY={setPrevScrollY} />}

            {tabStatus === 'review' && <div>
              review
            </div>}

          </div>
        </div>

        <div className='lg:w-[25%] bg-emerald-50 hidden lg:block'>
          2
        </div>
        <div className='lg:w-[25%] bg-emerald-50 lg:hidden'>
          2
        </div>

      </div>


    </div>
  );
};

export default HotelDetails;
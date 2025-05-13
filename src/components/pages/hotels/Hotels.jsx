import React, { useEffect, useRef, useState } from 'react';
import useHotels from '../../../hooks/useHotels';
import SearchOption from '../home/searchOption/SearchOption';
import { DownIcon } from '../../../provider/IconProvider';
import Sort from '../../shared/sort/Sort';
import HotelCart from './hotel-card/HotelCart';
import HotelSkeleton from '../../shared/skeleton/hotel-skeleton/HotelSkeleton';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router';


const Hotels = () => {
  const [showSortDropdown, setShowSortDropDown] = useState(false);
  const sortSectionRef = useRef(null);
  const location = useLocation();
  const { data } = useHotels();
  

  const hotelUrlParams = new URLSearchParams(location.search);
  
  const locationName = hotelUrlParams.get("location");
  const checkIn = hotelUrlParams.get("chackIn");
  const checkOut = hotelUrlParams.get("chackOut");
  const rooms = hotelUrlParams.get("room");
  const adults = hotelUrlParams.get("adults");
  const children = hotelUrlParams.get("children");

  const info = {
    locationName,
    checkIn,
    checkOut,
    rooms,
    adults,
    children
  }
  
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (sortSectionRef.current && !sortSectionRef.current.contains(e.target)) {
        setShowSortDropDown(false);
      }
    }
    document.addEventListener('click', handleOutsideClick);

    
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    }    
  }, [])

  
 
  return (
    <div className='max-w-6xl mx-auto mt-2  lg:p-0'>
      <Helmet>
        <title>Hotels | Trevel BD</title>
        <link rel="canonical" href="/" />
      </Helmet>
      <div>
        <div className='hidden lg:block'>
          <SearchOption searchOptionValue={'hotel'} style={true} />
        </div>
        <div className='lg:hidden'>
          <SearchOption searchOptionValue={'hotel'} />
        </div>
      </div>


      <div className=' flex items-center gap-2 lg:justify-end bg-primaryColor lg:bg-white p-2 mb-2 shadow-lg lg:mt-4 relative'>
        <div className='lg:hidden'>
          <button onClick={() => setShowFilter(!showFilter)} className='flex items-center bg-white p-2 rounded-lg font-semibold'>Filter <DownIcon /></button>
        </div>

        <p className='hidden lg:block absolute  left-4 font-medium'>{data?.length} Total Hotels</p>

        <div>
          <Sort sortSectionRef={sortSectionRef} setShowSortDropDown={setShowSortDropDown} showSortDropdown={showSortDropdown} />
        </div>
      </div>

      <div className='flex gap-2 '>
        {!data ? (<HotelSkeleton />)
          :
         ( <>
            <div className='bg-red-50 w-[25%] hidden lg:block'>1</div>
            <div className='w-full lg:w-[75%]'>
              {data?.map(item => <HotelCart key={item.hotelName} hotel={item}  searchdata={hotelUrlParams}/>)}
            </div>
          </>)
        }


      </div>
    </div>
  );
};

export default Hotels;
import { Checkbox, FormControlLabel } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { LocationIcon, SearchIcon } from '../../../../provider/IconProvider';
import DateRangeCalender from '../../../shared/date-range/DateRange';
import searchBanner from '../../../../assets/image/banner/search-banner.jpg';
import useTourLocation from '../../../../hooks/useTourLocation';
const SearchOption = () => {
  const [visible, setVisible] = useState(null);
  const [searchOption, setSearchOption] = useState('tour');
  const [showTourSearchBar, setShowTourSearchBar] = useState(false);
  const [showHotelSearchBar, setShowHotelSearchBar] = useState(false);
  const [showHotelBookingDate, setShowHotelBookingDate] = useState(false);
  const [location] = useTourLocation();
  const [searchLocation, setSearchLocation] = useState('');
  const [searchHotel, setSearchHotel] = useState('');
  const [selectTourLocation, setSelectTourLocation] = useState('');
  const [selectHotelLocation, setSelectHotelLocation] = useState('');
  const [selectBookingDate, setSelectBookingDate] = useState({});
  const [locations, setLocations] = useState([]);
  const tourLocationListRef = useRef(null);
  const hotelLocationListRef = useRef(null);
  const bookingRef = useRef(null);
  const { startDate, endDate } = selectBookingDate;
  const startDateFormat = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  }).format(startDate || new Date());
  const endDateFormat = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  }).format(endDate || new Date());


  const filterLocation = locations.filter(location => location.title.toLowerCase().includes(searchLocation.toLowerCase() || searchHotel.toLowerCase()));


  const fetchAddress = async (lat, lon) => {
    try {
      await fetch(
        `${import.meta.env.VITE_LOCATION_API}?format=json&lat=${lat}&lon=${lon}`
      )
        .then(res => res.json())
        .then(data => {


          setSelectTourLocation(data.address.city);
          setSelectHotelLocation(data.address.city);

        })
    } catch (err) {
      console.log('Failed to fetch location name.');
    }
  };



  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        fetchAddress(lat, lon);
      },
      (err) => {
        console.log(`Error: ${err.message}`);
      }
    );


    const handleOutSiteClick = (e) => {
      if (tourLocationListRef.current && !tourLocationListRef.current.contains(e.target)) {
        setShowTourSearchBar(false);
      }
      if (hotelLocationListRef.current && !hotelLocationListRef.current.contains(e.target)) {
        setShowHotelSearchBar(false);
      }
      if (bookingRef.current && !bookingRef.current.contains(e.target)) {


        setShowHotelBookingDate(false);
      }
    }

    document.addEventListener('click', handleOutSiteClick);

    fetch('location.json')
      .then(res => res.json())
      .then(data => setLocations(data))


    return () => {
      navigator.geolocation.clearWatch(watchId);
      document.removeEventListener('click', handleOutSiteClick)
    }
  }, [searchOption])


 


  return (
    <div style={{ backgroundImage: `url(${searchBanner})` }} className="flex flex-col items-center justify-center w-full lg:h-[70vh] bg-center bg-cover rounded-2xl lg:py-20 lg:px-8 mb-10 mt-10">

      <div className='w-full bg-white flex flex-col items-center justify-center rounded-lg p-3'>
        <div className="flex items-center gap-3 mt-8 mb-2" >
          <div className="flex items-center">
            <FormControlLabel control={<Checkbox checked={searchOption === 'tour'} onChange={(e) => setSearchOption(e.target.value)} value={'tour'} />} label="Tour" />
          </div>

          <div className="flex items-center">
            <FormControlLabel control={<Checkbox checked={searchOption === 'hotel'} onChange={(e) => setSearchOption(e.target.value)} value={'hotel'} />} label="Hotel" />
          </div>
        </div>

        {searchOption === 'hotel' &&

          <section className='w-full  p-4 '>
            {/* desktop layout */}
            <section className=''>
              <div className="lg:grid grid-cols-2 lg:grid-cols-3 gap-2   pt-0 pl-0 w-full  ">

                <div onClick={(e) => {
                  e.stopPropagation();
                  setShowHotelSearchBar(!showHotelSearchBar)
                }} className="border border-gray-300 outline-none w-full   h-[65px] rounded-l-xl flex p- gap-2 cursor-pointer relative">
                  <div className="flex items-center">
                    <button className="text-[#F0721D]">
                      <LocationIcon />
                    </button>
                  </div>

                  <div className="flex  flex-col justify-center ">
                    <p className="text-xs text-gray-500 uppercase">City/Hotel/Resort/Area</p>
                    <h3 className="text-[15px] font-bold">{selectHotelLocation ? selectHotelLocation : 'Your location'}</h3>
                  </div>

                  {showHotelSearchBar && <div ref={hotelLocationListRef} className='w-full lg:w-full h-96 absolute top-[70px] z-10 p-2 bg-white shadow-primaryShadow rounded-lg '>
                    <div className='w-full h-10  flex items-center relative border-b border-gray-400'>
                      <SearchIcon className='absolute text-gray-500' />
                      <input
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => { setSearchHotel(e.target.value); }}
                        defaultValue={selectHotelLocation}
                        className='w-full h-full text-xs pl-4 outline-none' type="text" placeholder='Type to search' />
                    </div>

                    <div className='w-full h-80 overflow-scroll mt-1'>
                      {filterLocation.map(location => <p
                        onClick={() => { setSelectHotelLocation(location.title) }}
                        key={location.id}
                        className='text-xs p-2 rounded-lg hover:bg-[#E4E9F1] flex items-center gap-2'><LocationIcon className='text-gray-500' /> {location.title}</p>)}
                    </div>
                  </div>}
                </div>

                <div className='flex gap-2 relative my-2 lg:my-0'>
                  <div
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowHotelBookingDate(true)
                    }}
                    className="border border-gray-300 outline-none w-full h-[65px]  flex p-1 gap-2 cursor-pointer relative">


                    <div className="flex  flex-col justify-center">
                      <p className="text-xs text-gray-500 uppercase">Check out</p>
                      <h3 className=" font-bold"><span>{startDateFormat?.split(',')[1]}</span>'<span className='font-normal'>{startDateFormat?.split(',')[2]}</span></h3>
                      <p className='text-xs text-gray-500'>{startDateFormat?.split(',')[0]}</p>
                    </div>
                  </div>


                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setVisible(1);
                      setShowHotelBookingDate(true)
                    }}
                    className="border border-gray-300 outline-none w-full h-[65px]  flex p-1 gap-2 cursor-pointer relative">


                    <div className="flex  flex-col justify-center">
                      <p className="text-xs text-gray-500 uppercase">Check out</p>
                      <h3 className=" font-bold"><span>{endDateFormat?.split(',')[1]}</span>'<span className='font-normal'>{endDateFormat?.split(',')[2]}</span></h3>
                      <p className='text-xs text-gray-500'>{endDateFormat?.split(',')[0]}</p>
                    </div>
                  </div>
                  {showHotelBookingDate && <div ref={bookingRef} className='bg-white absolute z-10 top-[70px] p-3 shadow-2xl rounded-lg'> <DateRangeCalender setSendData={setSelectBookingDate} SetAction={setShowHotelBookingDate} visible={visible} /></div>}
                </div>

                <div className="hidden border border-gray-300 outline-none w-full  h-[65px]  lg:flex p-1 gap-2 cursor-pointer">
                  <div className="flex items-center">
                    <button className="text-[#F0721D]">
                      <LocationIcon />
                    </button>
                  </div>

                  <div className="flex items-center flex-col justify-center">
                    <p className="text-xs text-gray-500">Rooms & Guests</p>
                    <h3 className="text-[15px] ">
                      <span className="font-bold">1 </span>Room,{" "}
                      <span className="font-bold">3 </span>Guest
                    </h3>

                    <p className="text-[12px] text-gray-500 ">
                      <span className="font-bold">2</span> Adults,{" "}
                      <span className="font-bold">1</span> Child
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:hidden border my-2 border-gray-300 outline-none w-full  h-[65px]  flex p-1 gap-2 cursor-pointer">
                <div className="flex items-center">
                  <button className="text-[#F0721D]">
                    <LocationIcon />
                  </button>
                </div>

                <div className="flex items-center flex-col justify-center">
                  <p className="text-xs text-gray-500">Rooms & Guests</p>
                  <h3 className="text-[15px] ">
                    <span className="font-bold">1 </span>Room,{" "}
                    <span className="font-bold">3 </span>Guest
                  </h3>

                  <p className="text-[12px] text-gray-500 ">
                    <span className="font-bold">2</span> Adults,{" "}
                    <span className="font-bold">1</span> Child
                  </p>
                </div>
              </div>

              <div className='lg:flex items-center justify-center'>
                <div onClick={() => {
                  console.log(selectHotelLocation);
                }} className="border w-full lg:w-40  h-[65px] bg-[#F0721D] rounded-lg lg:rounded-r-xl lg:mt-2 flex items-center justify-center  group cursor-pointer">
                  <p className="text-xs text-white transition-all ease-linear duration-300 group-hover:opacity-0">
                    Search..
                  </p>
                  <button className="text-3xl text-white absolute transition-all ease-linear duration-300 opacity-0 group-hover:opacity-100">
                    <SearchIcon />
                  </button>
                </div>
              </div>
            </section>


          </section>
        }


        {searchOption === 'tour' &&
          <section className='w-full'>

            <div onClick={(e) => {
              e.stopPropagation();
              setShowTourSearchBar(!showTourSearchBar);
            }} className="flex items-start w-full  p-4 pt-0 pl-0">


              <div className="border border-gray-300 outline-none w-full h-[65px] rounded-l-xl flex p-1 gap-2 cursor-pointer relative">
                <div className="flex items-center">
                  <button className="text-[#F0721D]">
                    <LocationIcon />
                  </button>
                </div>

                <div className="flex justify-center  flex-col ">
                  <p className="text-xs text-gray-500">Location/From</p>
                  <h3 className="text-[10px] lg:text-lg font-bold">{selectTourLocation ? selectTourLocation : 'Your location'}</h3>
                </div>


                {showTourSearchBar ? <div ref={tourLocationListRef} className='w-full lg:w-[43%] h-96 absolute top-[70px] z-10 p-2 bg-white shadow-primaryShadow rounded-lg '>
                  <div className='w-full h-10  flex items-center relative border-b border-gray-400'>
                    <SearchIcon className='absolute text-gray-500' />
                    <input
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => { setSearchLocation(e.target.value); }}
                      defaultValue={selectTourLocation}
                      className='w-full h-full text-xs pl-4 outline-none' type="text" placeholder='Type to search' />
                  </div>

                  <div className='w-full h-80 overflow-scroll mt-1'>
                    {filterLocation.map(location => <p
                      onClick={() => { setSelectTourLocation(location.title) }}
                      key={location.id}
                      className='text-xs p-2 rounded-lg hover:bg-[#E4E9F1] flex items-center gap-2'><LocationIcon className='text-gray-500' /> {location.title}</p>)}
                  </div>
                </div> : ''}
              </div>
            </div>

            <div className='lg:flex items-center justify-center'>
              <div onClick={() => {
                console.log(selectTourLocation);

              }} className="border w-full lg:w-40 h-[65px] bg-[#F0721D] rounded-lg lg:rounded-r-xl flex items-center justify-center  group cursor-pointer">
                <p className="text-xs text-white transition-all ease-linear duration-300 group-hover:opacity-0">
                  Search..
                </p>
                <button className="text-3xl text-white absolute transition-all ease-linear duration-300 opacity-0 group-hover:opacity-100">
                  <SearchIcon />
                </button>
              </div>
            </div>
          </section>
        }
      </div>
    </div>
  );
};

export default SearchOption;
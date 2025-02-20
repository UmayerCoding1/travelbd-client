import React, { useEffect, useRef, useState } from 'react';
import { LocationIcon, MinusIcon, PlusIcon, SearchIcon } from '../../../../provider/IconProvider';
import DateRangeCalender from '../../../shared/date-range/DateRange';
import useTourLocation from '../../../../hooks/useTourLocation';

const SearchOption = ({ searchOptionValue,style }) => {
  const [visible, setVisible] = useState(null);

  const [showTourSearchBar, setShowTourSearchBar] = useState(false);
  const [showHotelSearchBar, setShowHotelSearchBar] = useState(false);
  const [showHotelBookingDate, setShowHotelBookingDate] = useState(false);
  const [showBookingCount,setShowBookingCount] = useState(false);
  const [location] = useTourLocation();
  const [searchLocation, setSearchLocation] = useState('');
  const [searchHotel, setSearchHotel] = useState('');
  const [selectTourLocation, setSelectTourLocation] = useState('');
  const [selectHotelLocation, setSelectHotelLocation] = useState('');
  const [selectBookingDate, setSelectBookingDate] = useState({});
  const [locations, setLocations] = useState([]);

  // room and guest information
  const [roomsCount, setRoomsCount] = useState(1);
  const [adultsCount, setAdultsCount] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);
  const [bookingCounter, setBookingCounter] = useState({
    rooms: 1,
    adults: 2,
    children: 0
  })
  const tourLocationListRef = useRef(null);
  const hotelLocationListRef = useRef(null);
  const bookingRef = useRef(null);
  const bookingCounterRef = useRef(null);
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

  const handleIncriment = (setState, stateValue) => {
    if (stateValue < 4) {
      setState(stateValue => stateValue + 1);
    }
  }

  const handleDecrement = (setState, stateValue) => {
    if (stateValue > 0) {
      setState(stateValue => stateValue - 1);
    }
  }

  const handleSunmitBookingCounter = () => {
    const updatedBookingCounter = {
      ...bookingCounter,  // Preserve existing values
      rooms: roomsCount,
      adults: adultsCount,
      children: childrenCount,
    };

    setBookingCounter(updatedBookingCounter)
  }



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
      if (bookingCounterRef.current && !bookingCounterRef.current.contains(e.target)) {
        setShowBookingCount(false);
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
  }, [searchOptionValue])





  return (
    <div className=" ">

      <div className='w-full bg-white  rounded-lg '>


        {searchOptionValue === 'hotel' &&

          <section className='w-full  p-4 border-b-4 border-b-primaryColor'>
            {/* desktop layout */}
            <section className=''>
              <div className={` flex ${!style && 'flex-col'}  items-center justify-between gap-2  pt-0 pl-0 w-full  `}>

                <div onClick={(e) => {
                  e.stopPropagation();
                  setShowHotelSearchBar(!showHotelSearchBar)
                }} className="border border-gray-300 outline-none w-full   h-[65px] rounded-l-xl flex p- gap-2 cursor-pointer relative">
                  <div className="flex items-center">
                    <button className=" text-gray-500 ml-1">
                      <SearchIcon />
                    </button>
                  </div>

                  <div className="flex  flex-col justify-center ">
                    <p className="text-xs text-gray-500 uppercase">City/Area</p>
                    <h3 className="text-[15px] font-bold text-gray-600">{selectHotelLocation ? selectHotelLocation : 'Hotel location'}</h3>
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

                <div className='flex gap-2 w-full relative my-2 lg:my-0'>
                  <div
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowHotelBookingDate(!showHotelBookingDate)
                    }}
                    className="border border-gray-300 outline-none w-full h-[65px]  flex p-1 gap-2 cursor-pointer relative">


                    <div className="flex  flex-col justify-center">
                      <p className="text-xs text-gray-500 uppercase">Check in</p>
                      <h3 className="text-xs font-bold"><span>{startDateFormat?.split(',')[1]}</span>'<span className='font-normal'>{startDateFormat?.split(',')[2]}</span></h3>
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
                      <h3 className="text-xs font-bold"><span>{endDateFormat?.split(',')[1]}</span>'<span className='font-normal'>{endDateFormat?.split(',')[2]}</span></h3>
                      <p className='text-xs text-gray-500'>{endDateFormat?.split(',')[0]}</p>
                    </div>
                  </div>
                  {showHotelBookingDate && <div ref={bookingRef} className='bg-white absolute z-10 top-[70px] p-3 shadow-2xl rounded-lg'> <DateRangeCalender setSendData={setSelectBookingDate} SetAction={setShowHotelBookingDate} visible={visible} /></div>}
                </div>

                <div onClick={(e) => {
                  e.stopPropagation();
                  setShowBookingCount(!showBookingCount)
                }} className={` border border-gray-300 outline-none w-full    lg:flex p-3 gap-2 cursor-pointer  relative ${!style && 'mb-2'}`}>

                  <div className="">
                    <p className="text-xs text-gray-500">Rooms and Guests</p>
                    <div className='flex items-center gap-2'>
                      <h3 className="text-[15px] ">
                        <span className="font-bold">{bookingCounter.rooms}</span> <span className='text-xs'>{bookingCounter.rooms > 1 ? 'Rooms' : 'Room'}</span> ,{" "}
                        <span className="font-bold">{parseInt(bookingCounter.adults + parseInt(bookingCounter.children))} </span><span className="text-xs">Guest</span>
                      </h3>

                      <p className="text-[12px] text-gray-500 ">(
                        <span className="font-bold">{bookingCounter.adults}</span> Adults,{" "}
                        <span className="font-bold">{bookingCounter.children}</span> Children
                        )
                      </p>
                    </div>
                  </div>


                  {showBookingCount && <div ref={bookingCounterRef} className='w-full h-40 bg-white shadow-2xl absolute left-0 top-[70px] z-10 p-2 rounded-lg' >
                    <div className='flex items-center justify-between hover:bg-blue-50 p-2 rounded-lg'>
                      <h2 className='text-xs font-semibold '>{roomsCount > 1 ? 'Rooms' : 'Room'}</h2>
                      <div className='flex items-center gap-7'>
                        <MinusIcon onClick={roomsCount > 1 ? () => handleDecrement(setRoomsCount, roomsCount) : null} className={`${roomsCount <= 1 ? 'text-gray-300 cursor-not-allowed' : 'hover:text-primaryColor'}`} />
                        <span className='text-xs cursor-text w-7 text-center'>{roomsCount}</span>
                        <PlusIcon onClick={() => handleIncriment(setRoomsCount, roomsCount)} className={`  hover:text-primaryColor`} />
                      </div>
                    </div>


                    <div className='flex items-center justify-between hover:bg-blue-50 p-2 rounded-lg'>
                      <h2 className='text-xs font-semibold '>Adults</h2>
                      <div className='flex items-center gap-7'>
                        <MinusIcon onClick={adultsCount > 1 ? () => handleDecrement(setAdultsCount, adultsCount) : null} className={`${adultsCount <= 1 ? 'text-gray-300 cursor-not-allowed' : 'hover:text-primaryColor'}`} />
                        <span className='text-xs cursor-text w-7 text-center'>{adultsCount}</span>
                        <PlusIcon onClick={() => handleIncriment(setAdultsCount, adultsCount)} className={`  hover:text-primaryColor`} />
                      </div>
                    </div>


                    <div className='flex items-center justify-between hover:bg-blue-50 p-2 rounded-lg'>
                      <h2 className='text-xs font-semibold '>Children</h2>
                      <div className='flex items-center gap-7'>
                        <MinusIcon onClick={childrenCount > 0 ? () => handleDecrement(setChildrenCount, childrenCount) : null} className={`${childrenCount <= 0 ? 'text-gray-300 cursor-not-allowed' : 'hover:text-primaryColor'}`} />
                        <span className='text-xs cursor-text w-7 text-center'>{childrenCount}</span>
                        <PlusIcon onClick={() => handleIncriment(setChildrenCount, childrenCount)} className={`  hover:text-primaryColor`} />
                      </div>
                    </div>

                    <hr />
                    <div className='flex items-center justify-between mt-4'>
                      <p className="text-[12px] text-gray-500 ">(
                        <span className="font-bold">{bookingCounter.rooms}</span> {bookingCounter.rooms > 1 ? 'Rooms' : 'Room'},{" "}
                        <span className="font-bold">{bookingCounter.adults}</span> Adults,{" "}
                        <span className="font-bold">{bookingCounter.children}</span> Children
                        )
                      </p>
                      <button onClick={() => handleSunmitBookingCounter()} className='bg-primaryColor text-white text-xs font-semibold p-2 px-3  rounded-lg'>Done</button>
                    </div>
                  </div>}
                  
                </div>
              </div>



              <div className='flex items-center justify-center'>
                <button onClick={() => {
                  console.log(selectHotelLocation);

                }}
                  className={`bg-primaryColor text-white text-xs font-medium p-2 rounded-lg px-4   ${style ? 'w-40 mt-2' : 'w-full'}`}
                >Search </button>
              </div>
            </section>


          </section>
        }


        {searchOptionValue === 'tour' &&
          <section className='w-full p-2'>

            <div onClick={(e) => {
              e.stopPropagation();
              setShowTourSearchBar(!showTourSearchBar);
            }} className="flex items-start w-full  p-4 pt-0 pl-0">


              <div className="border border-gray-300 outline-none w-full h-[65px] rounded-l-xl flex p-1 gap-2 cursor-pointer relative">

                <div onClick={(e) => {
                  e.stopPropagation();
                  setShowTourSearchBar(!showTourSearchBar);
                }} className='lg:border rounded-lg w-[370px]  lg:w-96 p-3 cursor-pointer flex items-center gap-2'>
                  <SearchIcon />
                  <div>
                    <h2 className='text-xs text-gray-500'>Destination</h2>
                    <p className='font-semibold text-gray-600'>{selectTourLocation ? `${selectTourLocation.length > 35 ? `${selectTourLocation.slice(0, 35)} . . . .` : selectTourLocation}` : 'Select your dectination'}</p>
                  </div>
                </div>


                {showTourSearchBar ? <div ref={tourLocationListRef} className='w-full lg:w-full h-96 absolute top-[70px] z-10 p-2 bg-white shadow-primaryShadow rounded-lg '>
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

            <div className='flex items-center justify-center'>
              <button onClick={() => {
                console.log(selectTourLocation);

              }}
                className='bg-primaryColor text-white text-xs font-medium p-2 rounded-lg px-4 mb-2'
              >Search </button>
            </div>
          </section>
        }

      </div>
    </div>
  );
};

export default SearchOption;
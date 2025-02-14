import React, { useEffect, useRef, useState } from 'react';
import useDestinations from '../../../hooks/useDestinations';
import { SearchIcon } from '../../../provider/IconProvider';
import Sort from '../../shared/sort/Sort';
import MobileFilter from './mobile-filter/MobileFilter';
const Destinations = () => {
  const [searchDestination, setSearchDestination] = useState('');
  const [showDestinationDropown, setShowDestinationDropdown] = useState(false);
  const [searchLocation, setSearchLocation] = useState('');
  const [showSortDropdown,setShowSortDropDown] = useState(false);
  const [showFilter,setShowFilter] = useState(false);
  const [filterValue,setFilterValue] = useState({})
  const tourLocationRef = useRef(null);
  const sortSectionRef = useRef(null);
  const allDestinations = useDestinations(filterValue);
  const [locations, setLocations] = useState([]);

  const filterLocation = locations.filter(location => location?.title.toLowerCase().includes(searchLocation?.toLowerCase()));
  
  useEffect(() => {

    const handleOutsideClick = (e) => {
      if (tourLocationRef.current && !tourLocationRef.current.contains(e.target)) {
         setShowDestinationDropdown(false);
      }
      if(sortSectionRef.current && !sortSectionRef.current.contains(e.target)){
        setShowSortDropDown(false);
      }
    }

    if (showFilter) {
      document.body.style.overflow = 'hidden';
    } else document.body.style.overflow = 'auto';

    fetch('location.json')
      .then(res => res.json())
      .then(data => setLocations(data))

      document.addEventListener('click', handleOutsideClick);

      return () => {
        document.removeEventListener('click', handleOutsideClick);
      }
  }, [showFilter]);


  
  return (
    <div className='bg-blue-500 p-1'>
      <div className=' rounded-lg lg:flex items-center justify-between  lg:p-2 '>
        <div className='flex items-center lg:gap-3 relative border bg-white p-1 rounded-lg'  >
          <div onClick={(e) =>{
            e.stopPropagation();
            setShowDestinationDropdown(!showDestinationDropown)
          }} className='lg:border rounded-lg w-[370px]  lg:w-96 p-3 cursor-pointer'>
            <h2 className='font-semibold'>Destination</h2>
            <p className='text-xs text-gray-500 '>{searchDestination ? searchDestination : 'Select your sectination'}</p>
          </div>

          {/* destination location list */}
          {showDestinationDropown && <div ref={tourLocationRef} className='w-full lg:w-96  min-h-96 bg-white  absolute top-[70px]  p-2 ' >
            <div className='flex items-center '>
              <SearchIcon />
              <input className='w-full h-8 outline-none text-xs pl-2'
                onChange={(e) => setSearchLocation(e.target.value)}
                type="search"
                defaultValue={searchDestination}
                placeholder='Search your destination' />
            </div>
            <hr className='border-gray-400' />

            <div className='w-full h-80 overflow-auto mt-1'>
              {filterLocation.map(({ id, title }) => <p
                onClick={(e) => {
                  e.stopPropagation();
                  setSearchDestination(title);
                  setShowDestinationDropdown(false);
                }}
                key={id} className='text-xs font-medium text-gray-500 hover:bg-[#E4E9F1] p-2 mt-1 rounded-lg cursor-pointer'>{title}</p>)}
            </div>
          </div>}

          <div>
            <button className='flex  rounded-lg lg:text-lg font-semibold lg:border border-blue-500 p-4 text-blue-600'>
              <SearchIcon className='text-3xl lg:text-2xl' />
              <span className='hidden lg:block'>Search</span>
            </button>
          </div>
        </div>

        <div className=' flex items-center gap-2 '>
          <MobileFilter showFilter={showFilter} setShowFilter={setShowFilter} setFilterValue={setFilterValue}/>
          <Sort sortSectionRef={sortSectionRef} setShowSortDropDown={setShowSortDropDown} showSortDropdown={showSortDropdown} />
        </div>
      </div>

      
    </div>
  );
};

export default Destinations;
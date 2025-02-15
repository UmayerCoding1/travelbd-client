import React, { useEffect, useRef, useState } from 'react';
import useDestinations from '../../../hooks/useDestinations';
import { SearchIcon, DownIcon, LeftIcon } from '../../../provider/IconProvider';
import Sort from '../../shared/sort/Sort';
import Card from '../../shared/card/Card';
import Filter from './filter/Filter';
import Loading from '../../shared/loading/Loading';

const Destinations = () => {
  const [searchDestination, setSearchDestination] = useState('');
  const [showDestinationDropown, setShowDestinationDropdown] = useState(false);
  const [searchLocation, setSearchLocation] = useState('');
  const [showSortDropdown, setShowSortDropDown] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [filterValue, setFilterValue] = useState({})
  const [locations, setLocations] = useState([]);
  const tourLocationRef = useRef(null);
  const sortSectionRef = useRef(null);
  const [destinations] = useDestinations(filterValue);

  const filterLocation = locations.filter(location => location?.title.toLowerCase().includes(searchLocation?.toLowerCase()));

  useEffect(() => {

    const handleOutsideClick = (e) => {
      if (tourLocationRef.current && !tourLocationRef.current.contains(e.target)) {
        setShowDestinationDropdown(false);
      }
      if (sortSectionRef.current && !sortSectionRef.current.contains(e.target)) {
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

  if (!destinations) {
    return s
  }

  return (
    <div className=' max-w-6xl mx-auto mt-2  lg:p-0'>
      <div className='bg-blue-500 p-1 rounded-lg '>
        <div className=' rounded-lg lg:flex items-center justify-between  lg:p-2 '>
          <div className='flex items-center lg:gap-3 relative border bg-white p-1 rounded-lg'  >
            <div onClick={(e) => {
              e.stopPropagation();
              setShowDestinationDropdown(!showDestinationDropown)
            }} className='lg:border rounded-lg w-[370px]  lg:w-96 p-3 cursor-pointer'>
              <h2 className='font-semibold'>Destination</h2>
              <p className='text-xs text-gray-500 '>{searchDestination ? searchDestination : 'Select your sectination'}</p>
            </div>

            {/* destination location list */}
            {showDestinationDropown && <div ref={tourLocationRef} className='w-full lg:w-96  min-h-96 bg-white  absolute z-10 border-2 border-gray-500 rounded-lg  top-[70px]  p-2 ' >
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
            <div className='lg:hidden'>
              <button onClick={() => setShowFilter(!showFilter)} className='flex items-center bg-white p-2 rounded-lg font-semibold'>Filter <DownIcon /></button>

              {showFilter && <div className='w-full  absolute bottom-0 bg-white shadow z-10 left-0  p-4'>
                <div className='flex items-center justify-between lg:hidden'>
                  <LeftIcon onClick={() => setShowFilter(false)} className='text-lg' />
                  <h2 className='text-xl font-semibold'>Filter</h2>
                  <p onClick={() => setShowFilter(false)} className='text-gray-400'>Clear</p>
                </div>
                <hr className='mt-1' />
                <Filter setFilterValue={setFilterValue} />
              </div>}

            </div>
            <Sort sortSectionRef={sortSectionRef} setShowSortDropDown={setShowSortDropDown} showSortDropdown={showSortDropdown} />
          </div>
        </div>
      </div>

      <div className='mt-3 flex gap-2 '>
        <div className='hidden lg:block w-[25%] p-2 mt-5'>
          <div className='hidden lg:block' >
            <h2 className='text-xl font-semibold text-center'>Filter</h2>
          </div>
          <hr className='mt-1' />
          <Filter setFilterValue={setFilterValue} />
        </div>

        <div className='w-full  grid grid-cols-2 lg:grid-cols-3 gap-2'>
          {destinations?.map((destination) => <Card key={destination._id} please={destination} />)}
        </div>
      </div>
    </div>
  );
};

export default Destinations;
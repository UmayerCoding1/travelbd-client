import React, { useEffect, useRef, useState } from 'react';
import { LuArrowDownUp } from "react-icons/lu";
import { DownIcon, SelectIcon, UpIcon } from '../../../provider/IconProvider';
const Sort = ({ sortSectionRef, setShowSortDropDown, showSortDropdown }) => {
  const [sortValue, setSortValue] = useState('travelbd.com Recommended');

  const sortValues = [
    "travelbd.com Recommended",
    'Lowest Price (incl. Tax)',
    'Highest Price (incl. Tax',
    'Star Rating (High to Low)'
  ]


  return (
    <div className='mt-2 lg:mt-0 cursor-pointer relative'>
      <div onClick={(e) => {
        e.stopPropagation();
        setShowSortDropDown(!showSortDropdown)
      }} className='bg-white p-3 rounded-lg'>
        <div className='flex items-center gap-1 '>
          <LuArrowDownUp />
          <p className='text-xs font-medium'>Stor by: {sortValue}</p>
          {showSortDropdown ? <UpIcon/> : <DownIcon />}
        </div>


        {showSortDropdown && <div ref={sortSectionRef} className='w-full p-2 bg-white shadow-lg absolute left-0 top-[45px] rounded-lg'>
          {sortValues.map(item => <p key={item}
            onClick={(e) => {
              e.stopPropagation();
              setSortValue(item);
              setShowSortDropDown(false);
            }}
            className={`flex items-center gap-2 text-xs font-medium p-3 mt-1 ${sortValue === item ? 'text-[#6f91c9]' : 'text-black'}`}
          >
            {item}
            <span><SelectIcon className={`${sortValue === item && 'text-emerald-500'}`} /></span>
          </p>)}
        </div>}
      </div>
    </div>
  );
};

export default Sort;
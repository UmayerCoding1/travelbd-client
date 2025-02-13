import React from 'react';
import { ClockIcon, DownIcon, FeaturesIcon, GroupIcon, LocationIcon, OptionIcon } from '../../../provider/IconProvider';


const FQA = ({ keyValue, value, isActive, onToggle }) => {
    return (
        <li onClick={onToggle} className=' bg-white w-full g mt-5 border-b p-1 cursor-pointer '>
            <p className='font-semibold flex items-center justify-between  h-10'>
                <span className='flex items-center gap-2 '>{{
                    location: <LocationIcon className='text-gray-500' />,
                    features: <FeaturesIcon className='text-gray-500' />,
                    Price: <button className='text-gray-500'>৳</button>,
                    timing: <ClockIcon className='text-gray-500' />,
                    tourPackage: <GroupIcon className='text-gray-500' />,
                    option: <OptionIcon className='text-gray-500' />,
                }[keyValue] || null}
                    {keyValue?.charAt(0).toUpperCase() + keyValue.slice(1).toLowerCase()}</span>

                <span>{isActive ? <DownIcon className='rotate-180' /> : <DownIcon />}</span>


            </p>


           <div  className={`transition-all duration-500 ease-in-out overflow-hidden  ${
      isActive ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
    }`}>

{isActive && <>
                <div className='flex gap-2  ml-5 text-xs'>{Array.isArray(value) && <p className='pl-2'>{value.join(",")}</p>}</div>
                <div className='ml-5'>{typeof value === 'object' && !Array.isArray(value) && (<div>
                    {/* <p className='uppercase text-lg font-semibold'>inclusion</p> */}
                    <ul>
                        {value?.inclusion?.map(item => <li key={item} className='flex items-center gap-2 text-xs'><span className='block w-2 h-2 rounded-full bg-emerald-500'></span> {item}</li>)}
                    </ul>

                    
                    <ul className='mt-3'>
                        {value?.exclusion?.map(item => <li key={item} className='flex items-center gap-2 text-xs'><span className='block w-2 h-2 bg-red-500 rounded-full'></span> {item}</li>)}
                    </ul>
                </div>)}</div>

                <div>
                    {!Array.isArray(value) && typeof value !== 'object' && <p className='ml-5 text-xs'>{keyValue === 'Price' ? `৳ ${value} per person` : value}</p>}
                </div>
            </>}

           </div>
          
        </li>
    );
};

export default FQA;
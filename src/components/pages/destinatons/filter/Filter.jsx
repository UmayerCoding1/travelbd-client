import React, { useState } from 'react';
import { DownIcon, LeftIcon, StarIcon } from '../../../../provider/IconProvider';
import { Box, Slider } from '@mui/material';



function valuetext(value) {
  return `${value}°C`;
}

const Filter = ({ setFilterValue }) => {
  const [value, setValue] = React.useState([1, 0]);
  const [tourTypeValue, setTourTypeValue] = useState('');
  const [starRatingValue, setStarRatingValue] = useState('');
  const tourType = ['City','Beach'];
  const destinationRating = ['3', '4', '5'];


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleFilterResult = () => {
    const filterValue = {
      budget: value,
      tourType: tourTypeValue,
      starRating: starRatingValue
    }

    setFilterValue(filterValue);
  }

  const handleCheckedTOurType = (item) => {
     setTourTypeValue(item);
  }


  return (
    <div className=' mt-2 '>
      
    <div >
        

        <div className='p-1'>
          <div>
            <h2 className='text-xl lg:text-lg font-semibold'>Budget</h2>
            <div className='lg:mt-2'>
              <p>৳ {value[0]} - ৳ {value[1]}</p>
            </div>
            <Slider
              sx={{ color: '#000', width: '96%' }}
              getAriaLabel={() => 'Temperature range'}
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              max={20000}
            />

          </div>
          <hr className='border-black' />


          <div className='mt-2 '>
            <h2 className='text-xl lg:text-lg font-semibold'>Tour Type</h2>

            <div>

              {tourType?.map(item =>
                <div key={item} className='flex items-center gap-2 mt-1'>
                <input onChange={() => handleCheckedTOurType(item)} checked={tourTypeValue === item} type="checkbox" id={item} className='accent-black' />
                <label className='text-lg lg:text-xs font-medium' htmlFor="city">{item}</label>
              </div> )}
            </div>
          </div>
          <hr className='border-black mt-3' />


          <div className='mt-2  gap-2 '>
            <h2 className='text-xl lg:text-lg font-semibold'>Star Rating</h2>
            <div className='mt-2 flex items-center gap-2'>
              {destinationRating.map(item => <button
                onClick={() => setStarRatingValue(item)}
                key={item}
                className={`border border-black p-2 lg:p-1 rounded-lg flex items-center font-medium gap-1 lg:text-xs ${starRatingValue === item ? 'bg-black text-white' : ''}`}
              >
                <StarIcon />
                {item} Star
              </button>)}
            </div>
          </div>

          <button onClick={() => handleFilterResult()} className='mt-10 w-full bg-blue-500 p-3 lg:p-[7px] rounded-lg text-white font-bold'>Show Result</button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
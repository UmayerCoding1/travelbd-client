import React from 'react';
import { DownIcon, LeftIcon } from '../../../../provider/IconProvider';
import { Box, Slider } from '@mui/material';



function valuetext(value) {
  return `${value}°C`;
}

const MobileFilter = ({ showFilter, setShowFilter,setFilterValue }) => {
  const [value, setValue] = React.useState([0, 0]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleFilterResult = () => {
   const   filterValue = {
      budget: value
     }

     setFilterValue(filterValue);
  }


  return (
    <div className=' mt-2 '>
      <button onClick={() => setShowFilter(!showFilter)} className='flex items-center bg-white p-2 rounded-lg font-semibold'>Filter <DownIcon /></button>


      {showFilter && <div className='w-full  absolute bottom-0 bg-white shadow z-10 left-0  p-4'>
        <div className='flex items-center justify-between'>
          <LeftIcon onClick={() => setShowFilter(false)} className='text-lg' />
          <h2 className='text-xl font-semibold'>Filter</h2>
          <p onClick={() => setShowFilter(false)} className='text-gray-400'>Clear</p>
        </div>
        <hr className='mt-1' />

        <div className='p-1'>
          <div>
            <h2 className='text-xl font-semibold'>Budget</h2>
            <div>
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


          <div className='mt-2'>
            <h2 className='text-xl font-semibold'>Tour Type</h2>

            <div>
              <div className='flex items-center gap-2'>
                <input type="checkbox" className='accent-black' />
                <label className='text-lg font-medium' htmlFor="city">City</label>
              </div>
              <div className='flex items-center gap-2'>
                <input type="checkbox" className='accent-black' />
                <label className='text-lg font-medium' htmlFor="Beach">Beach</label>
              </div>
            </div>
          </div>

          <button onClick={() => handleFilterResult()} className='mt-10 w-full bg-blue-500 p-3 rounded-lg text-white font-bold'>Show Result</button>
        </div>
      </div>}
    </div>
  );
};

export default MobileFilter;
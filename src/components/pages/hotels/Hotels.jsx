import React from 'react';
import useHotels from '../../../hooks/useHotels';
import SearchOption from '../home/searchOption/SearchOption';

const Hotels = () => {
  const {data} = useHotels();

  console.log(data);
  return (
    <div>
       <div>
         
       </div>
    </div>
  );
};

export default Hotels;
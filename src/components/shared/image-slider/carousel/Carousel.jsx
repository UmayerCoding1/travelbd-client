import React, { useState } from 'react';
import { LeftIcon, RightIcon } from '../../../../provider/IconProvider';
const Carousel = ({ slides, style }) => {
  const [curr, setCurr] = useState(0)

  const prev = () => {
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1))
  }
  const next = () => {
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1))
  }

  if (!slides) {
    return;
  }
  return (
    <div className=' relative flex items-center justify-center'>
      {/* <div className={`${style} flex transition-transform  ease-out duration-300`} style={{ transform: `translateX(-${curr * 100}%)` }}>
        {slides.map((img, i) => <img key={i} className='w-full rounded-lg h-full object-cover ' src={img} />)}
      </div>


      <div className='absolute  inset-0  flex items-center justify-between p-4'>
        <button onClick={prev}><LeftIcon className='p-1 rounded-full bg-white/80 text-gray-800 hover:bg-white text-xl' /></button>
        <button onClick={next}><RightIcon className='p-1 rounded-full bg-white/80 text-gray-800 hover:bg-white text-xl' /></button>
      </div> */}


      <div className='w-[600px]   h-[600px] overflow-hidden'>
        <div className={`${style} w-full h-full flex transition-transform  ease-out duration-300`} style={{ transform: `translateX(-${curr * 100}%)` }}>
          {slides.map((img, i) => <img key={i} className='w-full rounded-lg h-full  ' src={img} />)}
        </div>
      </div>
      <div className='absolute  inset-0  flex items-center justify-between p-4'>
        <button onClick={prev}><LeftIcon className='p-1 rounded-full bg-white/80 text-gray-800 hover:bg-white text-4xl' /></button>
        <button onClick={next}><RightIcon className='p-1 rounded-full bg-white/80 text-gray-800 hover:bg-white text-4xl' /></button>
      </div> 
    </div>
  );
};

export default Carousel;
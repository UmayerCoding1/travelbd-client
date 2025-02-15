import React from 'react';
import { LocationIcon } from '../../../provider/IconProvider';
import ImageSlider from '../image-slider/ImageSlider';
import { Rating } from '@mui/material';
import { Link } from 'react-router';
const Card = ({please}) => {
    const {image,location,title,rating,Price,_id} = please;
   
    
    return (
        <div className="max-w-xs h-auto shadow-xl p-4 my-4 lg:my-0">
         <ImageSlider image={image} rating={rating} imageTitle={title} style={'w-full h-48 lg:h-52 relative'}/>
   <div>
      <div className='flex items-center justify-between'>
      
          <h2 className="text-lg font-bold my-2">
            {title?.length > 25 ? (
    <>
      {title.slice(0, 25)} <span className="font-normal text-gray-500">. . .</span>
    </>
  ) : (
    title
  )}</h2>
      

      {/* <Rating style={{fontSize: '18px', color: 'blue'}} name="read-only" value={Number(rating)} readOnly /> */}
      </div>
      <button className='flex items-center text-xs'><LocationIcon className="text-orange-500 " /> {location}</button>

      <div className="lg:flex items-center justify-between gap-4 ">
         <p className="text-sm font-medium flex items-center">
            <span className="text-orange-500">৳{Price}</span><span className='text-xs'>_per person</span>
         </p>

         <Link to={`/destination/${_id}`}>
         <button className=" w-full lg:w-20 h-8 border-[1.5px] mt-2 lg:mt-0 border-black rounded-lg text-xs hover:bg-primaryBgColor hover:text-white hover:border-none transition-all ease-linear duration-300">
            View 
         </button>
         </Link>
      </div>
   </div>
</div>
    );
};

export default Card;
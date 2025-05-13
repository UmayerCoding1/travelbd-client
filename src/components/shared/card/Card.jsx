import React from 'react';
import { LocationIcon } from '../../../provider/IconProvider';
import ImageSlider from '../image-slider/ImageSlider';
import { Link } from 'react-router';

const Card = ({ please }) => {
   const { image, location, title, Price, _id } = please;

   return (
      <div className="max-w-xs h-full shadow-xl p-4 my-4 lg:my-0 flex flex-col justify-between relative">
         <ImageSlider
            image={image}
            imageTitle={title}
            style="w-full h-48 lg:h-52 relative"
         />

         <div className="flex flex-col flex-grow">
            <h2 className="text-lg font-bold my-2">
               {title?.length > 25 ? (
                  <>
                     {title.slice(0, 25)} <span className="font-normal text-gray-500">. . .</span>
                  </>
               ) : title}
            </h2>

            <button className="flex items-center gap-1 text-sm absolute top-5 z-10 right-7 text-white glass">
               <LocationIcon className="text-orange-500" /> {location}
            </button>

            <div className="mt-auto bg-gray-100 p-2 lg:flex items-center justify-between">
               <p className="text-sm font-medium flex items-center">
                  <span className="text-orange-500">৳{Price}</span>
                  <span className="text-sm">_per person</span>
               </p>
               <Link to={`/destination/${_id}`}>
                  <button className="w-full lg:w-20 h-8 mt-2 lg:mt-0 rounded-lg text-sm bg-primaryBgColor text-white hover:border-none duration-300 ease-in">
                     View
                  </button>
               </Link>
            </div>
         </div>
      </div>
   );
};

export default Card;

import React from 'react';
import { IoIosHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
const Favorite = ({style}) => {
  return (
    <button className={` ${style} bg-white text-[25px] p-1 rounded-full`}><IoMdHeart className='text-red-500'/></button>
  );
};

export default Favorite;
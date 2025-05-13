import React, { useState } from 'react';
import bannerBg from './../../../../assets/image/banner/banner-bg2.jpg'
import { GoDash } from "react-icons/go";
import { FaPlus } from "react-icons/fa6";

import SearchOption from '../searchOption/SearchOption';
const BannerA = () => {
    const [searchOption, setSearchOption] = useState('tour');
    
    return (
        <div className='w-full h-[70vh] lg:h-[80vh]  relative'>
            <img className='w-full h-full' src={bannerBg} alt="" />
            <div className='w-full h-full bg-[#00000086]  absolute top-0 left-0 flex flex-col lg:flex-row  gap-2 lg:p-2'>

                <div className='w-full lg:w-1/2 order-1 lg:order-2 flex items-center justify-center mt-5 lg:mt-0'>
                    <div className='bg-white text rounded-lg w-96 transform duration-300 ease-linear '>
                        <div onClick={() => setSearchOption(searchOption === 'tour' ? '' : 'tour')} className='w-full bg-primaryBgColor text-white flex gap-5 p-2 rounded-t-lg cursor-pointer'>
                            <button>{searchOption === 'tour' ? <GoDash /> : <FaPlus />}</button>
                            <p className='font-medium'>Tour</p>
                        </div>

                        {searchOption === 'tour' && <div>
                            <SearchOption searchOptionValue={'tour'} />
                        </div>}
                        <div onClick={(e) => {
                            setSearchOption(searchOption === 'hotel' ? '' : 'hotel')
                        }} className='w-full bg-primaryBgColor text-white flex gap-5 p-2 rounded-b-lg cursor-pointer'>
                            <button >{searchOption === 'hotel' ? <GoDash /> : <FaPlus />}</button>
                            <p className='font-medium'>Hotel</p>
                        </div>

                        {searchOption === 'hotel' && <div>
                            <SearchOption searchOptionValue={'hotel'} />
                        </div>}
                    </div>
                </div>


                <div className='w-full lg:w-1/2 flex flex-col justify-center gap-4 order-2 lg:order-1'>
                    <h2 className='bg-primaryColor p-2 w-60 rounded-xl text-2xl font-AlexBrush text-white'>Know Before You GO</h2>
                    <p className='text-2xl lg:text-4xl font-medium p-2 leading-tight bg-white text-primaryColor rounded-lg'>Explore the Beauty of Bangladesh with <span className="text-[#0B7019] font-semibold">TRAVEL</span>
                        <span className="text-red-500 font-s font-semibold">BD</span>
                        <span className="text-sm text-black font-semibold">.com</span></p>

                    <p className='text-sm leading-relaxed text-white'>
                        "Explore Bangladesh’s stunning landscapes, rich culture, and hidden treasures. From serene beaches to lush greenery, TRAVELBD.com offers curated experiences for unforgettable journeys. Plan your perfect adventure today!"
                    </p>
                </div>

            </div>
        </div>
    );
};

export default BannerA;
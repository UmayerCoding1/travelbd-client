import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../shared/sectionTitle/SectionTitle';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Rating } from '@mui/material';
import reviewImg from './../../../../assets/image/review_img.JPG'


const Review = () => {
    const [reviews,setReviews]= useState([]);
    useEffect(() => {
        fetch('review.json')
        .then(res => res.json())
        .then(data => setReviews(data))
    },[])

    
    
    return (
        <div className='w-full   mt-36'>
              <h1 className='text-3xl font-bold text-center'>Loved By Over Thousand Travelers</h1>


              <div className='flex flex-col lg:flex-row items-center justify-evenly p-2'>
                {reviews?.map((review,ixd) => <div key={ixd} className='bg-gray-50 w-60 lg:w-64 h-60 rounded-lg my-3 lg:my-0 hover:bg-blue-500 hover:text-white transition-all ease-linear duration-300 p-1'>
                    <div className='w-full h-[60%] bg-white rounded-lg p-3'>
                       <Rating style={{fontSize: '18px', color: "#3b82f6"}} name="read-only" value={review.rating} readOnly />
                       <p className='text-sm leading-5 text-black'>{review.content}</p>
                    </div>

                    <div className='flex items-center gap-3 mt-5 '>
                        <img className='w-16 h-16 rounded-full' src={review.image} alt="" />

                        <div >
                            <p className='text-sm font-semibold'>{review.author_name}</p>
                            <p className='text-sm font-semibold'>{review.date}</p>
                        </div>
                    </div>
                </div>)}
              </div>
        </div>
    );
};

export default Review;
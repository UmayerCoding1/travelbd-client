import React from 'react';
import './reload.css'
import { logo } from '../../../provider/ImageProvider';

const ReloadAnimation = () => {
    return (
        <div className=' h-screen flex items-center justify-center flex-col p-2'>
            <img data-aos="fade-right"
     data-aos-offset="300"
     data-aos-easing="ease-in-sine" className='lg:w-[200px]' src={logo} alt="" />
            <p className='text-sm uppercase'>travel Smart, Discover the Heart of travelBD.</p>
        </div>
    );
};

export default ReloadAnimation;
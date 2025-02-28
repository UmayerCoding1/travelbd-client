import React from 'react';
import aboutImg1 from '../../../../assets/image/about/about1.jpg';
import coverImg from '../../../../assets/image/about/cover.jpeg';
import mainImage from '../../../../assets/image/about/main.webp';
import AOS from 'aos';
import 'aos/dist/aos.css';
import NumberCount from '../../../shared/numberCount/NumberCount';
import { Link } from 'react-router';
import { RightArrowIcon } from '../../../../provider/IconProvider';
AOS.init();


const About = () => {
    return (
        <div className='mt-20 lg:mt-10'>
            <div className='lg:flex gap-5  '>
                <img className='lg:w-[35%] rounded-2xl ' src={mainImage} alt="" />


                <div className=' mt-10 lg:mt-0'>


                    <div className='mt-3 '>


                        <div className='lg:flex gap-4'>
                            <h1 className='text-5xl lg:text-6xl font-bold  lg:w-[70%]' >We  Recommend</h1>
                            <p className='lg:w-[28%] text-xs mt-4 lg:mt-0'>Let’s  chose your dream destination here we  provide many destination and we offer the bast
                                destination every  week.</p>
                        </div>
                        <h1 className='text-6xl font-bold my-6'>Beautiful Destinations</h1>
                        <div className='lg:flex gap-4'>
                            <h1 className='text-6xl font-bold lg:w-[60%]' >Every Month</h1>
                            <p className='lg:w-[50%] text-xs mt-4 lg:mt-0'>Let’s  chose your dream destination here we  provide many destination and we offer the bast
                                destination every  week.</p>
                        </div>
                    </div>



                </div>
            </div>

            <div className='lg:flex  gap-5 mt-2'>
                <div className='bg-gray-50 h-24 rounded-xl lg:w-[35%] my-4 lg:mt-0 flex items-center justify-center gap-2'>
                    <p className=' text-3xl font-bold text-blue-500'>25% OFF</p>
                    <p className='text-xs text-gray-500'>Till 01 February, <br /> 2025</p>
                </div>

                <div className='bg-gray-100 h-24 rounded-xl lg:w-[65%] my-4 lg:mt-0 flex items-center justify-center relative' >
                    <Link to={'/hotel'} className='absolute w-full h-full'>
                        <div className='w-full h-full'>
                            <img className=' w-full h-full rounded-xl object-cover ' src={coverImg} alt="" />
                            <div className='bg-[#3e3d3d75] w-full h-full absolute top-0 rounded-xl'></div>
                            <p className='flex items-center absolute top-[42%] left-[25%] lg:left-[40%] text-xl font-semibold text-white'>Book A Hotel Now <RightArrowIcon /></p>
                        </div>
                    </Link>
                </div>
            </div>

            <div className='lg:grid gap-2 grid-cols-3 m-5 lg:m-16 lg:mt-10 transition-all ease-in-out duration-300'>
                <div data-aos="flip-up" className='bg-[#E7E7E7] w-full h-52 flex flex-col items-center justify-center rounded-lg hover:shadow-lg hover:bg-blue-500 hover:text-white transition-all ease-linear duration-300'>
                    <h2 className='text-3xl font-semibold  transition-colors duration-300'><NumberCount target={571} duration={3000} /></h2>
                    <p className='transition-colors duration-300'>our explorers</p>
                </div>

                <div data-aos="flip-up" className="bg-[#E7E7E7] w-full h-52 flex flex-col items-center justify-center rounded-lg hover:shadow-lg hover:bg-blue-500 hover:text-white transition-all ease-in-out duration-300 my-5 lg:my-0">
                    <h2 className="text-3xl font-semibold transition-colors duration-300">
                        <NumberCount target={100} duration={3000} />
                    </h2>
                    <p className="transition-colors duration-300">Destination</p>
                </div>

                <div data-aos="flip-up" className='bg-[#E7E7E7] mt-3 lg:mt-0  w-full h-52 flex flex-col items-center justify-center rounded-lg hover:shadow-lg hover:bg-blue-500 hover:text-white transition-all ease-linear duration-300'>
                    <h2 className='text-3xl font-semibold transition-colors duration-300'><NumberCount target={5} duration={3000} /></h2>
                    <p className='transition-colors duration-300'>Year’s experience</p>
                </div>
            </div>
        </div>
    );
};

export default About;
import React, { useState } from 'react';
import { useLoaderData, useParams } from 'react-router';
import { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import ImageSlider from '../../../shared/image-slider/ImageSlider';
import { ClockIcon, DownIcon, FolderIcon, GroupIcon, LocationIcon, MessageIcon, OptionIcon } from '../../../../provider/IconProvider';
import Accordion from '../../../shared/Accordion/Accordion';
import BookATour from './book-a-tour/BookATour';
import TourConsultation from './tour-consultation/TourConsultation';



const DestinationDetails = () => {
    const [selectBookingType, setSelectBookingType] = useState('book a tour');
    const [showTourConsultation, setShowTourConsultation] = useState(false);
    const { data } = useLoaderData();
    const { title, image, location, tourLocation, Offer, requirement, rating, _id } = data;

    const handleBookingDestination = () => {
        
    }

    if (!data) {
        return;
    }

    return (
        <div className='my-5 lg:p-10 relative max-w-6xl mx-auto'>
            <Helmet>
                <title>{title} | Travel BD</title>
            </Helmet>
            <div className='lg:flex '>
                <div className='lg:w-[70%] lg:h-96  lg:flex gap-4 '>
                    <ImageSlider image={image} style={'lg:w-[85%] h-96  '} />


                    <div className='lg:w-[20%] flex lg:block items-center justify-between mt-2 lg:mt-0'>
                        {image?.length > 5 ? <>
                            {image?.slice(0, 4).map(img => <img key={img} src={img} className='w-20 h-16 lg:mt-2 cursor-pointer ' />)}
                            <div className='w-20 h-16 lg:h-20 bg-black text-white content-center text-center lg:mt-2 cursor-pointer'>{image?.length - 4}+</div>
                        </> :

                            <>
                                {image?.slice(0, 5).map(img => <img key={img} src={img} className='w-20 h-16 mt-2' />)}
                            </>
                        }
                    </div>
                </div>

                <div className='lg:w-[30%] mt-5  lg:mt-0'>
                    <h2 className='text-lg font-bold'>{title}</h2>
                    <button className='flex items-center text-sm gap-1'><LocationIcon className='text-gray-500' />{tourLocation}</button>

                    <p className='text-sm flex items-center gap-5 mt-2 lg:mt-3'> {Offer?.day ? <span className='flex items-center gap-1'><ClockIcon className='text-gray-400' /> {Offer.day} day</span> : <span className='flex items-center gap-1'><ClockIcon className='text-gray-400' /> {Offer.hours} hours</span>}  <span className='flex items-center gap-1'><GroupIcon className='text-gray-400' />From {Offer.from} to {Offer.to} People</span></p>

                    <p className='flex items-start text-[10px] gap-1 mt-2'><span><FolderIcon className='text-[15px] text-gray-400' /></span> <span>{Offer.fund}</span></p>
                    <p className='flex items-center gap-2 text-sm mt-2'><OptionIcon />At list {Offer.from} people</p>
                    <ul className='mt-5'>
                        <p className='text-l font-semibold '>Requirements</p>
                        {requirement.length > 0 ? requirement.map((item, ixd) => <li key={ixd} className='text-[10px] ml-6  mt-2 list-disc'>{item}</li>) : <li className='text-[10px] ml-6  mt-2 list-disc'>Copy of NID card</li>}
                    </ul>

                </div>
            </div>



            <div className='lg:flex mt-3 gap-2 '>
                <div className='flex-1'>

                    <Accordion data={data} />
                    <div className='mt-3'>
                        <div className='flex items-center justify-between'>
                            <h2 className='text-[15px] font-semibold '>Policy</h2>
                            <DownIcon />
                        </div>

                        <div className='p-3 pt-1'>
                            <h1 className='text-lg font-semibold'>TravelBD.com Booking and Payment Policy</h1>

                            <div className='pl-3 mt-3'>
                                <h1 className='font-bodyTextFontRaleway font-semibold'>1. Booking Confirmation:</h1>
                                <ul className='pl-6 '>
                                    <li className='list-disc text-sm font-medium mt-1 '>When you book a destination on TravelBD.com, your tour is considered confirmed.</li>
                                </ul>
                            </div>

                            <div className='pl-3 mt-3'>
                                <h1 className='font-bodyTextFontRaleway font-semibold'>2. Payment Terms:</h1>
                                <ul className='pl-6 '>
                                    <li className='list-disc text-sm font-medium mt-1 '>After booking confirmation, you must pay 50% of the total tour cost in advance.</li>
                                    <li className='list-disc text-sm font-medium mt-1 '>The remaining 50% must be paid after the completion of the tour.</li>
                                </ul>
                            </div>

                            <div className='pl-3 mt-3'>
                                <h1 className='font-bodyTextFontRaleway font-semibold'>3. Cancellation and Refund Policy:</h1>
                                <ul className='pl-6 '>
                                    <li className='list-disc text-sm font-medium mt-1 '>If you cancel the tour before the specified time, a cancellation fee may apply.</li>
                                    <li className='list-disc text-sm font-medium mt-1 '>The refund policy will be determined based on the tour package and the time of cancellation.</li>
                                    <li className='list-disc text-sm font-medium mt-1 '>If the booking is canceled after confirmation, 15% of the total paid amount will be charged as a cancellation fee.</li>
                                    <li className='list-disc text-sm font-medium mt-1 '>However, if the booking is canceled within 30 minutes of confirmation, no charge will be applied.</li>
                                </ul>
                            </div>

                            <div className='pl-3 mt-3'>
                                <h1 className='font-bodyTextFontRaleway font-semibold'>4. Other Terms:</h1>
                                <ul className='pl-6 '>
                                    <li className='list-disc text-sm font-medium mt-1 '>If you use any services other than those mentioned on the tour details page, additional charges may apply.</li>
                                    <li className='list-disc text-sm font-medium mt-1 '>Prohibited items or unauthorized items will not be allowed, even if payment is made for them.</li>
                                    <li className='list-disc text-sm font-medium mt-1 '>If there is any unexpected issue or error by the management, the user will receive a full refund of the paid amount.</li>
                                    <li className='list-disc text-sm font-medium mt-1 '>Failure to make the final payment on time may result in additional charges or legal actions.</li>
                                    <li className='list-disc text-sm font-medium mt-1 '>TravelBD.com reserves the right to modify this policy at any time.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-[30%] h-[580px] shadow-xl hidden p-3 lg:block'>
                    <div className='flex items-center gap-2'>
                        <button onClick={() => setSelectBookingType('book a tour')} className={`w-1/2 h-10  text-sm ${selectBookingType === 'book a tour' ? 'border-b-2 border-emerald-500 font-medium' : 'text-gray-500'}`}>Book A Tour</button>
                        <span className='block w-[1px] h-10 bg-gray-300'></span>
                        <button onClick={() => setSelectBookingType('tour consultation')} className={`w-1/2 h-10  text-sm ${selectBookingType === 'tour consultation' ? 'border-b-2 border-emerald-500 font-medium' : 'text-gray-500'}`}>Tour Consultation</button>
                    </div>


                    <div>
                        {selectBookingType === 'book a tour' && <BookATour offer={Offer} tourData={data} />}
                        {selectBookingType === 'tour consultation' && <TourConsultation />}
                    </div>

                </div>



                {/* mobile */}
                <div className='lg:hidden p-8 mt-5'>
                    <BookATour title={'Get Book a Tour'} offer={Offer} tourData={data} />
                    {showTourConsultation && <div className='fixed z-10 w-full h-full bg-black/50 top-0 left-0 flex items-center justify-center'>
                        <TourConsultation toggleAction={setShowTourConsultation} />
                    </div>}
                </div>
                <MessageIcon onClick={() => setShowTourConsultation(true)} className=' fixed lg:hidden  shadow-2xl right-3 bottom-2 text-sm w-10 h-10   text-blue-500  p-1 rounded-lg' />
                <div>


                </div>
            </div>
            <Toaster position='top-right' containerStyle={false} />
        </div>
    );
};

export default DestinationDetails;
import React from 'react';
import { useLocation } from 'react-router';
import HotelBooking from './hotel-booking/HotelBooking';
import TourBooking from './tour-booking/TourBooking';
import Error from '../../shared/error/Error';
import useHotels from '../../../hooks/useHotels';
import { Helmet } from 'react-helmet';

const Booking = () => {
  const { data } = useHotels();
  const location = useLocation();
  const isHotelBooking = location.pathname.includes('hotel');
  const isDestinationBooking = location.pathname.includes('destination');

  if (!isHotelBooking && !isDestinationBooking) {
    return <Error />;
  }
  // const []

  return (
    <div className='bg-gray-50 h-screen relative'>
      <Helmet>
        <title>
          Booking | TravelBD.com
        </title>
      </Helmet>
      <div className='max-w-6xl mx-auto'>
        {isHotelBooking && <div>
          <HotelBooking hotels={data} />
        </div>}
        {isDestinationBooking && <div>
          <TourBooking />
        </div>}

        <div className='mt-5 bg-white shadow-xl p-2 '>
          <div>
            <h2 className='text-xl font-bodyTextFontRaleway font-bold'>Cancellation Policy</h2>

            <div className='mt-2'>
              <h2 className='text-lg font-bodyTextFontRaleway font-semibold'>Non-refundable</h2>
              <p className='mt-1 text-sm'>This booking cannot be modified once confirmed. If you cancel, no refund will be provided. Failure to check in will result in a penalty equal to the cancellation fee. Please review your booking details carefully before confirming.</p>
            </div>

            <div className='mt-4'>
              <h2 className='text-lg font-bodyTextFontRaleway font-semibold'>Check-in and Check-out Times</h2>
              <p className='mt-1 text-sm'>For the room type you selected, check-in is from 14:00 to 24:00 and check-out is before 12:00.</p>
            </div>

            <div className='mt-4'>
              <h2 className='text-lg font-bodyTextFontRaleway font-semibold'>Children Not Permitted</h2>
              <p className='mt-1 text-sm'>Children aren't permitted to stay in this room type. If you're traveling with children, please take a look at other room types available at this hotel.</p>
            </div>

            <div className='mt-4'>
              <h2 className='text-lg font-bodyTextFontRaleway font-semibold'>Deposit Policy</h2>
              <p className='mt-1 text-sm'>A cash deposit of THB 500.00 (approx. $14.81) in total is required at check-in. It will be refunded at the front desk upon check-out.</p>
            </div>

            <div className='mt-4'>
              <h2 className='text-lg font-bodyTextFontRaleway font-semibold'>City Notes</h2>
              <p className='mt-1 text-sm'>It is prohibited to bring durian to the hotel.</p>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default Booking;
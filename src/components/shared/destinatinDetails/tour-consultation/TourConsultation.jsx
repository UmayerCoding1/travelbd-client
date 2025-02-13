import React, { useState } from 'react';
import { CloseIcon } from '../../../../provider/IconProvider';


const TourConsultation = ({toggleAction}) => {
  const [selectDate,setSelectDate] =useState(new Date())

    const selectDateFormat = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        month: 'short',
        day: '2-digit',
        year: 'numeric'
      }).format(new Date(selectDate) || new Date());
      const handleTourConsultation = (e) => {
        e.preventDefault();
    }
   
   
   
    
    return (
        <form onSubmit={handleTourConsultation} className='mt-5 bg-white p-2'>
            <CloseIcon onClick={() => toggleAction(false)} className='lg:hidden float-right'/>
        <div className='mb-3'>
            <label className='text-xs font-medium' htmlFor="fullname">Full name</label> <br />
            <input className='border-[1.5px] border-gray-200 w-full h-10 outline-none pl-2 rounded-lg text-xs' type="text" name="fullname" id="" />
        </div>
        <div className='mb-3'>
            <label className='text-xs font-medium' htmlFor="email">Email</label> <br />
            <input className='border-[1.5px] border-gray-200 w-full h-10 outline-none pl-2 rounded-lg text-xs' type="email" name="email" />
        </div>
        <div className='mb-3'>
            <label className='text-xs font-medium' htmlFor="email">Contact Number</label> <br />
            <input className='border-[1.5px] border-gray-200 w-full h-10 outline-none pl-2 rounded-lg text-xs' type="number" name="contact_number" />
        </div>

        <div className='mb-2'>
            <label className='text-xs font-medium' htmlFor="Preferred Journey Date">Preferred Journey Date</label>
            <input onChange={(e) =>setSelectDate
            (e.target.value)} className='border-[1.5px] border-gray-200 w-full h-10 outline-none pl-2 rounded-lg text-xs' type="date" name="journey-date"  />
        </div>

        <div className='mb-2'>
        <label className='text-xs font-medium' htmlFor="Additional Requirements">Additional Requirements</label>
        <textarea className='outline-none border w-full resize-none text-xs p-1' rows={5}  name="message" id=""></textarea>
        </div>

        <div>
            <button type='submit' className='text-xs font-semibold bg-primaryBgColor text-white w-full h-8 rounded-lg mt-5 '>Submit</button>
        </div>
    </form>
    );
};

export default TourConsultation;
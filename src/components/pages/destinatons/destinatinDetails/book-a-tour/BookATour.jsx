import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { InfoIcon } from '../../../../../provider/IconProvider';
import useAuth from '../../../../../hooks/useAuth';
import UsePublicApiEndpoint from '../../../../../hooks/usePublicApiEndpoint';


const BookATour = ({ title, offer, tourData }) => {
    const { from, to } = offer;
    const [selectDate, setSelectDate] = useState('')
    const [peopleCount, setPeopleCount] = useState(from);
    const [loading, setLoadin] = useState(false);
    const { user } = useAuth();
    const { _id, Price } = tourData;
    const publicApiEndPoint = UsePublicApiEndpoint();



    const handleIncrement = () => {
        if (peopleCount === to) {
            toast.error(`Max people ${to}`, { duration: 1000 })
        }
        if (peopleCount < to) {
            setPeopleCount(prev => prev + 1);
        }
    }

    const handleDecrement = () => {
        if (peopleCount === from) {
            toast('At list 1 people have to stay', {
                icon: <InfoIcon className='text-lg' />,
                style: {
                    backgroundColor: '#3c7aec',
                    color: '#fff',
                    fontSize: '10px'
                },
                duration: 5000
            });


        }
        if (peopleCount > from) {
            setPeopleCount(prev => prev - 1);
        }
    }
    const handleBookATour = async (e) => {
        e.preventDefault();
        setLoadin(true);
        const form = e.target;
        const bookingInfo = {
            fullName: user?.fullName || form.fullname.value,
            email: user?.email || form.email.value,
            contactNumber: user?.emergency_contact || form.contact_number.value,
            selectTourDate: selectDate,
            people: peopleCount,
            destinationId: _id,
            price: Price * peopleCount
        }

        const response = await publicApiEndPoint.post('/booking-destination', bookingInfo);
      
        if (response.data.errorMessage) {
            setLoadin(false);
            toast.error(response.data.errorMessage, { duration: 1500, position: 'top-right' })
        }
        if (response.data.message) {
            setLoadin(false);
            toast.success(response.data.message, { duration: 1500, position: 'top-right' })
        }
      


    }



    return (

        <form onSubmit={handleBookATour} className='mt-5 shadow-primaryShadow lg:shadow-none p-2'>

            {title && <h1 className='text-center font-semibold my-3'>{title}</h1>}
            <div className='mb-3'>
                <label className='text-sm font-medium' htmlFor="fullname">Full name</label> <br />
                <input className='border-[1.5px] border-gray-200 w-full h-10 outline-none pl-2 rounded-lg text-sm' type="text" name="fullname" defaultValue={user?.fullName} required />
            </div>
            <div className='mb-3'>
                <label className='text-sm font-medium' htmlFor="email">Email</label> <br />
                <input className='border-[1.5px] border-gray-200 w-full h-10 outline-none pl-2 rounded-lg text-sm' name='email' defaultValue={user?.email} required />
            </div>
            <div className='mb-3'>
                <label className='text-sm font-medium' htmlFor="email">Contact Number</label> <br />
                <input className='border-[1.5px] border-gray-200 w-full h-10 outline-none pl-2 rounded-lg text-sm' type="number" name="contact_number" defaultValue={user?.emergency_contact} required />
            </div>

            <div className='mb-2'>
                <label className='text-sm font-medium' htmlFor="Preferred Journey Date">Preferred Journey Date</label>
                <input onChange={(e) => setSelectDate(e.target.value)} className='border-[1.5px] border-gray-200 w-full h-10 outline-none pl-2 rounded-lg text-sm' type="date" name="journey-date" required />
            </div><div className='mb-2'>
                {/* <DateRangeCalender btnText={'Done'}/> */}
            </div>

            <div className='mb-2'>
                <label className='text-sm font-medium' htmlFor="people">People</label>
                <div className='border p-2  flex items-center justify-between px-4 rounded-lg' >
                    <button type='button' onClick={handleDecrement} className='bg-gray-200 p-2 rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-500 hover:text-white'>-</button>
                    <span className='text-sm font-medium '>{peopleCount}</span>
                    <button type='button' onClick={handleIncrement} className='bg-gray-200 p-2 rounded-full w-5 h-5 flex items-center justify-center hover:bg-emerald-500 hover:text-white'>+</button>
                </div>
            </div>

            <div>
                <button type='submit' className='text-sm font-semibold bg-primaryBgColor text-white w-full h-8 rounded-lg mt-5'>{loading? <span className="loading loading-spinner loading-xs"></span> : "Booked"}</button>
            </div>
        </form>
    );
};

export default BookATour;
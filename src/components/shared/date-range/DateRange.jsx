import React, { useEffect, useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // Main style file
import 'react-date-range/dist/theme/default.css'; // Theme CSS file
const DateRangeCalender = ({setSendData, SetAction,visible,btnText}) => {
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ]);
    const [tempSelection, setTempSelection] = useState(state);
    console.log(visible);
    
    

    return (
        
        <div className='bg-white'>
            <DateRange
              showDateDisplay={false}
               rangeColors={['#F97316']}
                onChange={item => {
                    setState([item.selection])
                    setTempSelection([item.selection]);
                }}
                moveRangeOnFirstSelection={false}
                ranges={state}
                className='bg-white'
            />
 <hr className='border-black'/>
            <button 
             onClick={(e) => {
                e.stopPropagation();
                SetAction(false)
                setSendData(tempSelection[0])}}
            className={`w-full h-10 text-xs rounded-lg font-semibold mt-5  ${state[0].endDate ? 'bg-orange-500 text-white' : "bg-gray-300 cursor-not-allowed text-gray-500"}`} >{btnText ? btnText :"Reserve"}</button>
        </div>
    );
};

export default DateRangeCalender;
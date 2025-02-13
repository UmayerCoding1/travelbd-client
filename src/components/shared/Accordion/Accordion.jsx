import React, { useState } from 'react';
import FQA from './FQA';
import { OptionIcon } from '../../../provider/IconProvider';

const Accordion = ({data}) => {
    const [activeId,setActiveId] = useState(false);
    // console.log(data);
    const {_id,title,tourLocation,Offer,requirement,image,rating,option, ...accordionData} =  data;
    const modifiedPackageArray = Object.entries(accordionData).map(([key, value], index) => ({
        index: index + 1,  
        key: key,
        value: value
      }));
      
      const handleButton = (id) => {
         setActiveId((prevId) => (prevId === id) ? false : id)
      }
    
    return (
        <div>
            <ul>
                {modifiedPackageArray.map((currElt,inx) => <FQA key={inx} keyValue={currElt.key} value={currElt.value} onToggle={() => handleButton(inx)} isActive={activeId === inx}/>)}
                
            </ul>
        </div>
    );
};

export default Accordion;
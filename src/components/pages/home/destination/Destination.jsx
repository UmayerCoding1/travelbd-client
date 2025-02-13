import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../shared/sectionTitle/SectionTitle';
import Card from '../../../shared/card/Card';
import useDestinations from '../../../../hooks/useDestinations';

const Destination = () => {
    const [destinations] =useDestinations();
    
    
    return (
        <div className=' mt-20'>
            <div className='flex flex-col items-center justify-center'>
              
              <h2 className='text-3xl lg:text-5xl text-center '><span className='font-bold'>Let’s Explore</span> Your Dream  <br />
              Destination Here!
              </h2>
              <p className='text-xs text-center '>We have recommended every week so you don’t have to worry about your dream destination  with travel</p>
            </div>

             {/* <div></div> */}
            {destinations?.length < 1 ? 'No destinations available right now.' :
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  lg:gap-10 lg:m-16 place-content-center '>
            {destinations?.slice(0,6).map((please,i) => <Card key={i} please={please}/>)}
       </div>
            }
        </div>
    );
};

export default Destination;
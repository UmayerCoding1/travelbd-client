import React, { useContext } from 'react';
import Banner from './banner/Banner';
import About from './about/About';
import { ReloadLoadingContext } from '../../../utils/loading';
import Service from './service/Service';
import Destination from './destination/Destination';
import Review from './review/Review';
import SearchOption from './searchOption/SearchOption';
import useDestinations from '../../../hooks/useDestinations';




const Home = () => {
    return (
        <div>
                <Banner />
                {/* <SearchOption /> */}
                <div className='max-w-6xl mx-auto mt-2 p-2 lg:p-0 '>

                <Destination />
                <About />
                <Service />
                <Review />
                </div>
        </div>
    );
};

export default Home;
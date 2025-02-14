import React, { useContext } from 'react';
import { Outlet } from 'react-router';
import Navbar from '../shared/navbar/Navbar';
import Footer from '../shared/footer/Footer';
import { ReloadLoadingContext } from '../../utils/loading';
import ReloadAnimation from '../shared/reload-animation/ReloadAnimation';



const Root = () => {
    const {skeletonLoading} = useContext(ReloadLoadingContext);
    console.log(skeletonLoading);
    
    return (
        <div >
           {skeletonLoading ? <ReloadAnimation/> 
            : 
            <>
            <Navbar/>
            <div className='max-w-6xl mx-auto mt-2 p-2 lg:p-0 '>
                <Outlet/>
            </div>
                <Footer/>
            </>
            
        }
           
        </div>
    );
};

export default Root;
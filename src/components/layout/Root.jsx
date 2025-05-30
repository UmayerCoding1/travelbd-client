import React, { useContext } from 'react';
import { Outlet } from 'react-router';
import Navbar from '../shared/navbar/Navbar';
import Footer from '../shared/footer/Footer';
import { ReloadLoadingContext } from '../../utils/loading';
import ReloadAnimation from '../shared/reload-animation/ReloadAnimation';



const Root = () => {
    const {skeletonLoading} = useContext(ReloadLoadingContext);
    
    
    return (
        <div className='bg-white text-black'>
           {skeletonLoading ? <ReloadAnimation/> 
            : 
            <>
            <Navbar/>
            <div>
                <Outlet/>
            </div>
                <Footer/>
            </>
            
        }
           
        </div>
    );
};

export default Root;
import React, { createContext, useEffect, useState } from 'react';


export const ReloadLoadingContext = createContext(null);
const LoadingContext = ({children}) => {
    const [skeletonLoading,setSkeletonLoading]= useState(true);


    useEffect(() => {
        setTimeout(() => {
            setSkeletonLoading(false)
        },2000)


    },[])

    const contextValue = {
        skeletonLoading,
        setSkeletonLoading
    }
    return <ReloadLoadingContext.Provider value={contextValue}>
        {children}
    </ReloadLoadingContext.Provider>
};

export default LoadingContext;
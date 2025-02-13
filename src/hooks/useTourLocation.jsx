import React from 'react';
import { useQuery } from 'react-query';

const useTourLocation = () => {
    const {data : location} = useQuery({
        queryKey: ["location"],
        queryFn: async () => {
           
        }
    })
    return [location]
};

export default React.memo(useTourLocation);
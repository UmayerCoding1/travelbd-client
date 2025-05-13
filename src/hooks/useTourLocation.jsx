import React, { useEffect, useState } from 'react';
import UsePublicApiEndpoint from './usePublicApiEndpoint';

const useTourLocation = () => {
    const [locations,setLocations] = useState([]);
    const publicApiEndPoint =UsePublicApiEndpoint();

    const fetchTourLocation = async () => {
      const response = await publicApiEndPoint.get('/locations');
      if (response.status === 200) {
        setLocations(response.data.data);
      } else {
        console.error('Error fetching tour locations:', response.statusText);
      }
      
    }

    useEffect(() => {
        fetchTourLocation();
    },[])
    return [locations]
};

export default useTourLocation;
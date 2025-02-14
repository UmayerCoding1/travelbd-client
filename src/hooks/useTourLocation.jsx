import React, { useEffect, useState } from 'react';

const useTourLocation = () => {
    const [locations,setLocations] = useState([]);
    useEffect(() => {
        fetch('location.json')
      .then(res => res.json())
      .then(data => setLocations(data))
    },[])
    return [locations]
};

export default useTourLocation;
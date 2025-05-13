import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';


const useHotelReviews = () => {
  const {data: hotelReviews = []} = useQuery({
    queryKey: ['hotelReviews'],
    queryFn: async () => {
      const response = await axios.get('hotelReview.json');
      return response.data;
    }
  })

  return {hotelReviews}
};

export default useHotelReviews;
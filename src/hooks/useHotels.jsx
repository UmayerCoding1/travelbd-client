import React from 'react';
import { useQuery } from '@tanstack/react-query';
import UsePublicApiEndpoint from './usePublicApiEndpoint';

const useHotels = () => {
  const publicApiEndPoint = UsePublicApiEndpoint();
  const {data : hotels = [] } = useQuery({
    queryKey: ['hotels'],
    queryFn: async () => {
      const respons = await  publicApiEndPoint.get('/hotels');
      return respons.data
    }
  })

  return hotels;
};

export default useHotels;
import React from 'react';
import { useQuery } from 'react-query';
import UsePublicApiEndpoint from './usePublicApiEndpoint';

const useDestinations = () => {
    const publicApiEndPoint = UsePublicApiEndpoint();
    const {data: destinations = []} = useQuery({
        queryKey: ['destinations'],
        queryFn: async () => {
            const response = await publicApiEndPoint.get('/destinations');
            return response.data.data;
        }
    })
    
    
    return [destinations];
};

export default useDestinations;
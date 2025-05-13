
import { useQuery } from '@tanstack/react-query';
import UsePublicApiEndpoint from './usePublicApiEndpoint';

const useDestinations = (filterValue,locationName) => {
    const publicApiEndPoint = UsePublicApiEndpoint();
    const {data: destinations = []} = useQuery({
        queryKey: ['destinations',filterValue,locationName],
        queryFn: async () => {
            const response = await publicApiEndPoint.get(`/destinations?location=${locationName}`);
            return response.data.data;
        }
    })
 
    
    
    return [destinations];
};

export default useDestinations;
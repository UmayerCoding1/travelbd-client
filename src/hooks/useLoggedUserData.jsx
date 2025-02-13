import React from 'react';
import { useQuery } from 'react-query'; 
import useAuth from './useAuth';
import useSecureApiEndPoint from './useSecureApiEndPoint';


const useLoggedUserData = () => {
    const {user} = useAuth();
    const secureApiEndPoint = useSecureApiEndPoint();
    

    const {data:loggedUser,refetch:loggedUserRefetch} = useQuery({
        queryKey: ['LoggedUser',user],
        queryFn: async () => {
            const res = await secureApiEndPoint.get(`/user?email=${user?.email}`);
            return res.data.data;
        }
    })
    
    return [loggedUser,loggedUserRefetch];
};

export default useLoggedUserData;
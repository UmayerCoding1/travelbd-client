import axios from 'axios';


const apiEndpoint = axios.create({    
    baseURL: import.meta.env.VITE_API_ENDPOINT_PRODUCTION,
    withCredentials: true,
})
const UsePublicApiEndpoint = () => {
 
    return apiEndpoint;
};

export default UsePublicApiEndpoint;
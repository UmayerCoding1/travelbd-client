import axios from 'axios';


const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_ENDPOINT_PRODUCTION,
    withCredentials: true
})
const useSecureApiEndPoint = () => {
   
    axiosSecure.interceptors.request.use(function(config) {
        const accessToken = localStorage.getItem('accessToken');
           
        config.headers.Authorization = `Bearer ${accessToken}`;
        return config;
    })

    return axiosSecure;
};

export default useSecureApiEndPoint;
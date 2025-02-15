import axios from 'axios';


const axiosSecure = axios.create({
baseURL: "http://localhost:5000/api/v1",
    // baseURL: "https://travelbd-server-vgxf.onrender.com/api/v1",
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
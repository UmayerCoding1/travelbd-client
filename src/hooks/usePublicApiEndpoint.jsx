import axios from 'axios';


const apiEndpoint = axios.create({
    baseURL:"http://localhost:5000/api/v1",
    // baseURL: "https://travelbd-server-vgxf.onrender.com/api/v1",
    withCredentials: true,
})
const UsePublicApiEndpoint = () => {
 
    return apiEndpoint;
};

export default UsePublicApiEndpoint;
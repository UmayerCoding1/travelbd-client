import { createBrowserRouter } from "react-router";
import Root from "../components/layout/Root";
import Home from "../components/pages/home/Home";
import SignIn from "../components/pages/sign-in/SignIn";
import SignUp from "../components/pages/sign-up/SignUp";
import Profile from "../components/pages/user/profile/Profile";
import PrivetRoute from "./PrivetRoute";
import Destinations from "../components/pages/destinatons/destinations";
import Hotels from "../components/pages/hotels/Hotels";
import HotelDetails from "../components/pages/hotels/hotel-details/HotelDetails";
// import HotelBooking from "../components/pages/hotels/hotel-booking/HotelBooking";
import DestinationDetails from "../components/pages/destinatons/destinatinDetails/DestinationDetails";
import Booking from "../components/pages/booking/Booking";
import Error from "../components/shared/error/Error";
import MyBooking from "../components/pages/user/my-booking/MyBooking";
import AdminDashboard from "../components/pages/admin/page/AdminDashboard";
import AdminHome from "../components/pages/admin/page/Home";
import Users from "../components/pages/admin/page/Users";

const render = createBrowserRouter([
    {
        path: '/',
        element: <Root/>,
        // errorElement: <Error/>,
        children:[
            {
                path: '/',
                element:<Home/>
            },

            {
                path: '/destinations',
                element:<Destinations/>
            },
            {
                path:'/destination/:id',
                element:<DestinationDetails/>,
                loader: async ({params}) => await fetch(`${import.meta.env.VITE_API_ENDPOINT_PRODUCTION}/destination/${params.id}`)
            },
            {
                path:'/hotel',
                element: <Hotels/>
            },
            {
                path:'/to/hotel/:id/hotel-deatils',
                element: <HotelDetails/>,
                loader: async ({params}) => await fetch(`${import.meta.env.VITE_API_ENDPOINT_PRODUCTION}/HOTEL/${params.id}`)
            },
            {
                path: ':type/booking',
                element:<PrivetRoute><Booking/></PrivetRoute>
            },



            // user related route
            {
                path:"/profile",
                element: <PrivetRoute><Profile/></PrivetRoute>
            },
            {
                path:'/my-booking',
                element:<MyBooking/>
            }
            
        ]
    },
    // auth related
    {path: '/sign-in', element:<SignIn/>},
    {path: '/sign-up', element:<SignUp/>},
    
    
    // admin related route 
    {
        path:'admin',
        element:<PrivetRoute><AdminDashboard/></PrivetRoute>,
        children:[
            {
                path:'home',
                element:<AdminHome/>
            }
            ,
            {
                path:'users',
                element: <PrivetRoute><Users /> </PrivetRoute>
            }
           
        ]
    }
    
])

export default render;
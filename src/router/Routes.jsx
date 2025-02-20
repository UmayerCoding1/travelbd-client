import { createBrowserRouter } from "react-router";
import Root from "../components/layout/Root";
import Home from "../components/pages/home/Home";
import SignIn from "../components/pages/sign-in/SignIn";
import SignUp from "../components/pages/sign-up/SignUp";
import Profile from "../components/pages/user/profile/Profile";
import PrivetRoute from "./PrivetRoute";
import DestinationDetails from "../components/shared/destinatinDetails/DestinationDetails";
import Destinations from "../components/pages/destinatons/destinations";
import Hotels from "../components/pages/hotels/Hotels";
import HotelDetails from "../components/pages/hotels/hotel-details/HotelDetails";

const render = createBrowserRouter([
    {
        path: '/',
        element: <Root/>,
        errorElement: <Error/>,
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
                loader: async ({params}) => await fetch(`${import.meta.env.VITE_API_ENDPOINT_LOCAL}/destination/${params.id}`)
            },
            {
                path:'/hotel',
                element: <Hotels/>
            },
            {
                path:'/to/hotel/:id/hotel-deatils',
                element: <HotelDetails/>,
                loader: async ({params}) => await fetch(`${import.meta.env.VITE_API_ENDPOINT_LOCAL}/HOTEL/${params.id}`)
            },



            // user related route
            {
                path:"/profile",
                element: <PrivetRoute><Profile/></PrivetRoute>
            }
            
        ]
    },
    // auth related
    {path: '/sign-in', element:<SignIn/>},
    {path: '/sign-up', element:<SignUp/>}
    
])

export default render;
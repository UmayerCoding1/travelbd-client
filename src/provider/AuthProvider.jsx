import React, { createContext, useEffect, useState } from 'react';
import UsePublicApiEndpoint from '../hooks/usePublicApiEndpoint';
import toast from 'react-hot-toast';
import useSecureApiEndPoint from '../hooks/useSecureApiEndPoint';


export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const publicApiEndpoint = UsePublicApiEndpoint();
  const secureApiEndPoint = useSecureApiEndPoint();



  const createUser = (userData) => {
    setLoading(true);
    return publicApiEndpoint.post('/register', userData)
  }


  const loginUser = (loginData) => {
    setLoading(true);
    return publicApiEndpoint.post('/login', loginData)
  }

  const logoutUser = async () => {
    setLoading(true);

    await secureApiEndPoint.post('/logout')
      .then(res => {
        console.log(res.data);
        setUser(null)
        setLoading(false);
        localStorage.removeItem('accessToken')
      })
      .catch((error) => {
        console.log(error.message);
      })
  }


  useEffect(() => {
    const storeUser = async () => {
      try {
       const res =  await secureApiEndPoint.get('/refresh') // Fetch user data with refresh endpoint
       if (res.data.data) {
        setUser(res.data.data); // Set user data
        console.log('currentUser', res.data.data);
       }

      } catch (error) {
        console.error('Error fetching user data:', error.message);
      } finally {
        setLoading(false); // Ensure loading state is updated
      }
    }

    setTimeout(() => {
      !user ? setLoading(false) : console.log(false);
    }, 1000)


    storeUser();


  }, [secureApiEndPoint])


  const authInfo = {
    setUser,
    user,
    setLoading,
    loading,
    createUser,
    loginUser,
    logoutUser
  }
  return <AuthContext.Provider value={authInfo}>
    {children}
  </AuthContext.Provider>

};

export default AuthProvider;
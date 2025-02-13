
import { createRoot } from 'react-dom/client'
import './index.css'
import Root from './components/layout/Root'
import {  RouterProvider } from 'react-router'
import render from './router/Routes'
import LoadingContext from './utils/loading'
import AuthProvider from './provider/AuthProvider'
import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
<AuthProvider>
  <QueryClientProvider client={queryClient}>
  <LoadingContext>
  <RouterProvider router={render}>
    <Root/> 
  </RouterProvider>
    </LoadingContext>
  </QueryClientProvider>
    
    </AuthProvider>
)

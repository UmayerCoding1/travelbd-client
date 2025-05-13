import React from "react";
import useAuth from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import { Navigate } from "react-router";
import Loading from "../components/shared/loading/Loading";

const PrivetRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  
  if (loading) {
    return <Loading />
  }
  if (user) {
    return children
  }
  return <Navigate to={'/sign-in'} state={{ form: location }} replace />
};

export default PrivetRoute;

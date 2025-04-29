import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = () => {
  const { currentUser, loading } = useAuth();
  
  // Show nothing while checking authentication
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return currentUser ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
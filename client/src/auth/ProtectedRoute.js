import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useViewContext } from '../context/ViewContext';

const ProtectedRoute = ({ element }) => {
  const {isAuthenticated} = useViewContext();
  return isAuthenticated ? (
    element
  ) : (
    <Navigate to="/" replace state={{ from: '/admin' }} />
  );
};

export default ProtectedRoute;
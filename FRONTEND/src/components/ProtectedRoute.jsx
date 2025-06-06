import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../api/auth.api';

// Protected route wrapper component
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;

import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../api/auth.api';

// Public route wrapper component (redirects to home if already authenticated)
const PublicRoute = ({ children }) => {
  if (isAuthenticated()) {
    // Redirect to home if already authenticated
    return <Navigate to="/" replace />;
  }
  return children;
};

export default PublicRoute;

// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Import useAuth

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth(); // Get the user from AuthContext

  // If the user is not logged in, redirect to the login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If the user is logged in, render the children (the protected component)
  return children;
};

export default ProtectedRoute;
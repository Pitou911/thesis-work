// src/contexts/AuthContext.js
import React, { createContext, useState, useContext } from 'react';
import { api } from '../services/api'; // Import the api service

// Create the AuthContext
const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Initialize user state from localStorage (if available)
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (userData) => {
    setUser(userData); // Set the user data
    localStorage.setItem('token', userData.token); // Store the token in localStorage
    localStorage.setItem('user', JSON.stringify(userData)); // Store user data in localStorage
  };

  const logout = () => {
    setUser(null); // Clear the user data
    localStorage.removeItem('token'); // Remove the token from localStorage
    localStorage.removeItem('user'); // Remove user data from localStorage
  };

  const register = async (userData) => {
    try {
      const response = await api.register(userData); // Call the register API
      console.log('Registration successful:', response.data);
      return response.data; // Return the registered user data
    } catch (error) {
      console.error('Registration failed:', error);
      throw error; // Propagate the error
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create and export the useAuth hook
export const useAuth = () => {
  return useContext(AuthContext);
};
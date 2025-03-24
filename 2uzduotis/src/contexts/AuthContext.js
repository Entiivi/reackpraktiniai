// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

// Create a Context for authentication
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Load authentication state from localStorage (if available)
  const [isAuthenticated, setIsAuthenticated] = useState(
    JSON.parse(localStorage.getItem('isAuthenticated')) || false
  );
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );

  // Whenever isAuthenticated or user changes, update localStorage
  useEffect(() => {
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
    localStorage.setItem('user', JSON.stringify(user));
  }, [isAuthenticated, user]);

  // Function to log the user in
  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  // Function to log the user out
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

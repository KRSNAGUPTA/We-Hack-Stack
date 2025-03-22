import React, { createContext, useState, useContext, useEffect } from 'react';
import api from './api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to get user details from the backend
  const getUserDetails = async () => {
    try {
      setLoading(true);
      const response = await api.get('/users/user-details');
      if (response.data.success) {
        setUser(response.data.user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      setUser(null);
      setIsAuthenticated(false);
      setError(error.response?.data?.message || 'Failed to authenticate');
    } finally {
      setLoading(false);
    }
  };

  // Function to login
  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await api.post('/users/login', { email, password });
      if (response.data.success) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        localStorage.setItem('isLoggedIn', 'true');
        return { success: true };
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.message || 'Login failed');
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed' 
      };
    } finally {
      setLoading(false);
    }
  };

  // Function to logout
  const logout = async () => {
    try {
      setLoading(true);
      await api.post('/users/logout');
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Logout error:', error);
      setError(error.response?.data?.message || 'Logout failed');
    } finally {
      setLoading(false);
    }
  };

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuth = async () => {
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      if (isLoggedIn) {
        await getUserDetails();
      } else {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        error,
        login,
        logout,
        getUserDetails
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

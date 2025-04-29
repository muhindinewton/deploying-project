import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user is logged in on page load
    const token = localStorage.getItem('token');
    if (token) {
      checkUserStatus(token);
    } else {
      setLoading(false);
    }
  }, []);

  const checkUserStatus = async (token) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      
      const response = await axios.get('/api/profile', config);
      setCurrentUser(response.data.user);
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (username, email, password) => {
    try {
      setError('');
      const response = await axios.post('/api/signup', { username, email, password });
      
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setCurrentUser(user);
      return true;
    } catch (error) {
      setError(error.response?.data?.message || 'Sign up failed');
      return false;
    }
  };

  const signIn = async (email, password) => {
    try {
      setError('');
      const response = await axios.post('/api/signin', { email, password });
      
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setCurrentUser(user);
      return true;
    } catch (error) {
      setError(error.response?.data?.message || 'Sign in failed');
      return false;
    }
  };

  const signOut = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    loading,
    error,
    signUp,
    signIn,
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
import React, { createContext, useState, useCallback, useEffect } from 'react';
import { authAPI } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in on mount and if session has expired
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      const sessionExpiry = localStorage.getItem('sessionExpiry');

      if (token && storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          
          // Check if session has expired (2 days = 48 hours)
          if (sessionExpiry) {
            const expiryTime = new Date(sessionExpiry).getTime();
            const currentTime = new Date().getTime();
            
            if (currentTime > expiryTime) {
              // Session expired, log out
              console.log('Session expired after 2 days, logging out');
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              localStorage.removeItem('sessionExpiry');
              setUser(null);
              setIsAuthenticated(false);
              setLoading(false);
              return;
            }
          }
          
          setUser(userData);
          setIsAuthenticated(true);
        } catch (err) {
          console.error('Error parsing stored user:', err);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          localStorage.removeItem('sessionExpiry');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const signup = useCallback(async (name, email, password, confirmPassword) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.signup(name, email, password, confirmPassword);
      
      // Save token and user
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      // Set session expiry to 2 days from now
      const expiryTime = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000); // 2 days
      localStorage.setItem('sessionExpiry', expiryTime.toISOString());
      
      setUser(response.user);
      setIsAuthenticated(true);
      
      return response;
    } catch (err) {
      const errorMessage = err.error || 'Signup failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.login(email, password);
      
      // Save token and user
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      // Set session expiry to 2 days from now
      const expiryTime = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000); // 2 days
      localStorage.setItem('sessionExpiry', expiryTime.toISOString());
      
      setUser(response.user);
      setIsAuthenticated(true);
      
      return response;
    } catch (err) {
      const errorMessage = err.error || 'Login failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback((navigate) => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('sessionExpiry');
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
    if (navigate) {
      navigate('/');
    }
  }, []);

  const playAsGuest = useCallback(() => {
    setUser({ username: 'Guest', isGuest: true });
    setIsAuthenticated(false);
  }, []);

  const loginWithOAuth = useCallback((userData) => {
    // Set session expiry to 2 days from now
    const expiryTime = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000); // 2 days
    localStorage.setItem('sessionExpiry', expiryTime.toISOString());
    
    setUser(userData);
    setIsAuthenticated(true);
  }, []);

  const value = {
    user,
    loading,
    error,
    isAuthenticated,
    signup,
    login,
    logout,
    playAsGuest,
    loginWithOAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

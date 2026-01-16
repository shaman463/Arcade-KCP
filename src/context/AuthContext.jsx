import React, { createContext, useState, useCallback } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const playAsGuest = useCallback(() => {
    setUser({ username: 'Guest', isGuest: true });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setError(null);
  }, []);

  const value = {
    user,
    loading,
    error,
    logout,
    playAsGuest,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

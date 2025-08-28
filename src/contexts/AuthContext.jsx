// src/contexts/AuthContext.jsx 
import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthService } from '../services/AuthService';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen to authentication state changes
  useEffect(() => {
    const unsubscribe = AuthService.onAuthStateChanged((user) => {
      console.log('🔄 Auth state changed:', user ? 'User logged in' : 'User logged out');
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe; // Cleanup listener
  }, []);

  // Sign up function with display name support
  const signUp = async (email, password, displayName = '') => {
    const result = await AuthService.signUp(email, password, displayName);
    if (!result.success) {
      throw new Error(result.error);
    }
    return result.user;
  };

  // Alias for backward compatibility (what your SignUpForm expects)
  const signup = async (email, password, displayName = '') => {
    return await signUp(email, password, displayName);
  };

  // Sign in function
  const signIn = async (email, password) => {
    const result = await AuthService.signIn(email, password);
    if (!result.success) {
      throw new Error(result.error);
    }
    return result.user;
  };

  // Login function (alias for signIn - this is what LoginForm expects)
  const login = async (email, password) => {
    return await signIn(email, password);
  };

  // Google sign-in function
  const signInWithGoogle = async () => {
    const result = await AuthService.signInWithGoogle();
    if (!result.success) {
      throw new Error(result.error);
    }
    return result.user;
  };

  // Sign out function
  const signOut = async () => {
    const result = await AuthService.signOut();
    if (!result.success) {
      throw new Error(result.error);
    }
  };

  // Send password reset
  const sendPasswordReset = async (email) => {
    const result = await AuthService.sendPasswordReset(email);
    if (!result.success) {
      throw new Error(result.error);
    }
  };

  const value = {
    currentUser,
    loading,
    signUp,
    signup,
    signIn,
    login,
    signInWithGoogle,
    signOut,
    logout: signOut, 
    sendPasswordReset,
  };
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
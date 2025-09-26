'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, authUtils, apiClient } from './api';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  login: (email: string, password: string, role: 'vendor' | 'distributor') => Promise<User>;
  register: (data: {
    email: string;
    password: string;
    name?: string;
    companyName?: string;
  }, role: 'vendor' | 'distributor') => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = authUtils.getToken();
        const savedUser = authUtils.getUser();
        
        if (token && savedUser) {
          // Verify token is still valid by making a request
          try {
            const profile = await apiClient.getProfile();
            setUser(profile);
            authUtils.setUser(profile);
          } catch (error) {
            // Token is invalid, clear auth
            authUtils.logout();
            setUser(null);
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        authUtils.removeToken();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string, role: 'vendor' | 'distributor') => {
    try {
      setIsLoading(true);
      const response = await apiClient.login(email, password, role);
      
      authUtils.setToken(response.token);
      authUtils.setUser(response.user);
      setUser(response.user);
      
      return response.user; // Return user data for navigation
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    data: {
      email: string;
      password: string;
      name?: string;
      companyName?: string;
    },
    role: 'vendor' | 'distributor'
  ) => {
    try {
      setIsLoading(true);
      const response = await apiClient.register(data, role);
      
      authUtils.setToken(response.token);
      authUtils.setUser(response.user);
      setUser(response.user);
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authUtils.removeToken();
    setUser(null);
  };

  const refreshUser = async () => {
    try {
      const profile = await apiClient.getProfile();
      setUser(profile);
      authUtils.setUser(profile);
    } catch (error) {
      console.error('Refresh user error:', error);
      logout();
    }
  };

  const value = {
    user,
    isLoading,
    isLoggedIn: !!user,
    login,
    register,
    logout,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

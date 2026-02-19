
'use client';

import { createContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import api from '@/utils/api';
import toast from 'react-hot-toast';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchUser = useCallback(async () => {
    const token = Cookies.get('token');
    if (token) {
      try {
        const { data: response } = await api.get('/auth/profile');
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch user profile', error);
        Cookies.remove('token');
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = async (email, password) => {
    try {
      const { data: response } = await api.post('/auth/login', { email, password });
      const { token, ...userData } = response.data;
      Cookies.set('token', token, { expires: 30, secure: process.env.NODE_ENV === 'production' });
      setUser(userData);
      router.push('/dashboard');
      return userData;
    } catch (error) {
      console.error('Login failed', error);
      const message = error.response?.data?.message || 'Login failed.';
      throw new Error(message);
    }
  };
  
  const register = async (userData) => {
    try {
        const { data: response } = await api.post('/auth/register', userData);
        const { token, ...newUserData } = response.data;
        Cookies.set('token', token, { expires: 30, secure: process.env.NODE_ENV === 'production' });
        setUser(newUserData);
        router.push('/dashboard');
        return newUserData;
    } catch (error) {
        console.error('Registration failed:', error);
        const message = error.response?.data?.message || 'Registration failed.';
        throw new Error(message);
    }
  };

  const logout = () => {
    Cookies.remove('token');
    setUser(null);
    toast.success('Logged out successfully.');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

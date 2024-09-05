import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    if (token) {
      console.log('Setting Authorization header:', `Bearer ${token}`);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      console.log('Removing Authorization header');
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  const login = async (username, password) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', { username, password });
      const { access } = response.data.token; // Access token
      const user = response.data.user; // User information
      
      console.log('Login response:', response.data);
      console.log('Access token:', access);

      if (access) {
        setToken(access);
        localStorage.setItem('token', access);
        setUser(user);
        return { success: true };
      } else {
        console.error('No access token found in response.');
        return { success: false, error: 'Login failed' };
      }
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      return { success: false, error: error.response?.data?.detail || 'Login failed' };
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register/', { username, email, password });
      const { access } = response.data.token; // Access token
      const user = response.data.user; // User information
      
      console.log('Registration response:', response.data);
      console.log('Access token:', access);

      if (access) {
        setToken(access);
        localStorage.setItem('token', access);
        setUser(user);
        return { success: true };
      } else {
        console.error('No access token found in response.');
        return { success: false, error: 'Registration failed' };
      }
    } catch (error) {
      console.error('Registration failed:', error.response?.data || error.message);
      return { success: false, error: error.response?.data?.detail || 'Registration failed' };
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  const value = {
    user,
    token,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

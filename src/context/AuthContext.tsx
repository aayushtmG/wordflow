import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '../types';
import {  redirect } from 'react-router-dom';


interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string,confirmPassword: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    console.log(import.meta.env.VITE_BACKEND_API);
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    token: '',
    error: null,
  });

  useEffect(() => {
    // Check for stored user in localStorage
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (storedUser) {
      const user = JSON.parse(storedUser) as User;
      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
        token: token || "",
        error: null,
      });
    } else {
      setState(prev => ({ ...prev, isLoading: false })); }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
        //todo 
        // find better way to import the env 
            // apply on all fetch calls
        const response = await fetch(import.meta.env.VITE_BACKEND_API + '/api/auth/signin',{
                method: 'POST',
                headers: {
                'Content-Type': "application/json"
                },
                body: JSON.stringify({email,password})
            });
            const data = await response.json();
            const {user,token} = data;

            if(!user){
                throw new Error(data.message);
            }
        localStorage.setItem('user',JSON.stringify(user));
        localStorage.setItem('token',token);
        setState({
          user,
            token,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Login failed',
      }));
    }
  };

  const signup = async (username: string, email: string, password: string,confirmPassword: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      // Mock API call for signup
            const response = await fetch('http://localhost:3000/api/auth/signup',{
                method: 'POST',
                headers:{
        'Content-Type': 'application/json',
                },body: JSON.stringify({username,email,password,confirmPassword})
            });
        const data = await response.json();
        const {user} = data;

        if(!user){
            throw new Error('Failed to signup');
        }
       redirect('/login'); 



      // // Mock successful signup
      // if (username && email && password) {
      //   const user: User = {
      //     id: '1',
      //     username,
      //     email,
      //   };
      //   
      //   localStorage.setItem('user', JSON.stringify(user));
      //   
      //   setState({
      //     user,
      //     isAuthenticated: true,
      //     isLoading: false,
      //     error: null,
      //   });
      // } else {
      //   throw new Error('Please fill all fields');
      // }
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Signup failed',
      }));
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};



export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

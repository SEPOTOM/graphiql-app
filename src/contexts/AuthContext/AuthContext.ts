'use client';

import { createContext, useContext } from 'react';

import { AuthData } from '@/contexts/AuthContext/types';

const AuthContext = createContext<AuthData>({
  status: 'loading',
  user: null,
  signOut: async () => {},
  signUp: async () => {},
  signIn: async () => {},
});

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthContext, useAuth };

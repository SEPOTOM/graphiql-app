'use client';

import { useState } from 'react';

import { auth } from '@/services';

import { AuthContext } from '@/contexts/AuthContext/AuthContext';

import { AuthProviderProps, AuthStatus } from '@/contexts/AuthContext/types';

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [status, setStatus] = useState<AuthStatus>('loading');

  return (
    <AuthContext.Provider
      value={{
        status,
        user: auth.currentUser,
        signOut: async () => {},
        signUp: async () => {},
        signIn: async () => {},
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

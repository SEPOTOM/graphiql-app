'use client';

import { useState } from 'react';

import { auth, registerWithEmailAndPassword } from '@/services';

import { AuthContext } from '@/contexts/AuthContext/AuthContext';

import { AuthProviderProps, AuthStatus, SignUpFunc } from '@/contexts/AuthContext/types';

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [status, setStatus] = useState<AuthStatus>('loading');

  const signUp: SignUpFunc = async (username: string, email: string, password: string) => {
    try {
      setStatus('loading');

      await registerWithEmailAndPassword({
        email,
        password,
        displayName: username,
      });

      setStatus('authenticated');
    } catch (err) {
      setStatus('unauthenticated');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        status,
        signUp,
        user: auth.currentUser,
        signOut: async () => {},
        signIn: async () => {},
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

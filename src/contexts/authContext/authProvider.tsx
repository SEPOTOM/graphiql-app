'use client';

import { useState } from 'react';

import { auth, registerWithEmailAndPassword } from '@/services';

import { AuthContext } from '@/contexts/AuthContext/AuthContext';

import { AuthProviderProps, AuthStatus, SignOutFunc, SignUpFunc } from '@/contexts/AuthContext/types';

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

  const signOut: SignOutFunc = async () => {
    setStatus('loading');

    await auth.signOut();

    setStatus('unauthenticated');
  };

  return (
    <AuthContext.Provider
      value={{
        status,
        signUp,
        signOut,
        user: auth.currentUser,
        signIn: async () => {},
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

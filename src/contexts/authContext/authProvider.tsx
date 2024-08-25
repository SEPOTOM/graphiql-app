'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth, registerWithEmailAndPassword } from '@/services';

import { AuthContext } from '@/contexts/AuthContext/AuthContext';

import { AuthProviderProps, AuthStatus, SignInFunc, SignOutFunc, SignUpFunc } from '@/contexts/AuthContext/types';

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

  const signIn: SignInFunc = async (email: string, password: string) => {
    try {
      setStatus('loading');

      await signInWithEmailAndPassword(auth, email, password);

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
        signOut,
        signIn,
        user: auth.currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

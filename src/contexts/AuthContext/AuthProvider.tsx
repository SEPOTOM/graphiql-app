'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onIdTokenChanged, signInWithEmailAndPassword } from 'firebase/auth';

import { auth, registerWithEmailAndPassword } from '@/services';

import { AuthContext } from '@/contexts/AuthContext/AuthContext';

import { SignUpData } from '@/types';
import { AuthProviderProps, SignInFunc, SignOutFunc, SignUpFunc } from '@/contexts/AuthContext/types';

import { AuthStatuses } from '@/contexts/AuthContext/consts';

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [status, setStatus] = useState(AuthStatuses.init);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      if (status === 'init') {
        user ? setStatus('authenticated') : setStatus('unauthenticated');
      }

      if (!user && status === 'authenticated') {
        router.push('/');
      }
    });

    return () => unsubscribe();
  }, [router, status]);

  const trackState = async (callback: () => Promise<unknown>) => {
    try {
      setStatus('loading');

      await callback();

      setStatus('authenticated');
    } catch (err) {
      setStatus('unauthenticated');
    }
  };

  const signUp: SignUpFunc = async (signUpData: SignUpData) => {
    await trackState(() => registerWithEmailAndPassword(signUpData));
  };

  const signOut: SignOutFunc = async () => {
    try {
      setStatus('loading');

      await auth.signOut();

      setStatus('unauthenticated');
    } catch (err) {
      setStatus('authenticated');
    }
  };

  const signIn: SignInFunc = async (email: string, password: string) => {
    await trackState(() => signInWithEmailAndPassword(auth, email, password));
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

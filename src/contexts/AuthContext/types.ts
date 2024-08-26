import { ReactNode } from 'react';
import { User } from 'firebase/auth';

import { SignUpData } from '@/types';

export type AuthStatus = 'authenticated' | 'unauthenticated' | 'loading' | 'init';

export type SignUpFunc = (signUpData: SignUpData) => Promise<void>;

export type SignOutFunc = () => Promise<void>;

export type SignInFunc = (email: string, password: string) => Promise<void>;

export interface AuthData {
  status: AuthStatus;
  user: Nullable<User>;
  signUp: SignUpFunc;
  signOut: SignOutFunc;
  signIn: SignInFunc;
}

export interface AuthProviderProps {
  children: ReactNode;
}

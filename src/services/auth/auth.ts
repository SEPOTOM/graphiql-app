import { signInWithCustomToken, signInWithEmailAndPassword, signOut } from 'firebase/auth';

import { auth } from '@/services/auth/firebase';

import { SignUpData, TokenRes } from '@/types';

export const registerWithEmailAndPassword = async (signUpData: SignUpData) => {
  const res = await fetch('/sign-up/api', {
    method: 'POST',
    body: JSON.stringify(signUpData),
  });
  const { token }: TokenRes = await res.json();

  await signInWithCustomToken(auth, token);
};

export const loginWithEmailAndPassword = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
  signOut(auth);
};

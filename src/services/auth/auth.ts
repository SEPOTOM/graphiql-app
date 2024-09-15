import { signInWithCustomToken } from 'firebase/auth';

import { AuthError } from '@/utils';
import { SignUpData, TokenRes } from '@/types';

import { auth } from './firebase';

export const registerWithEmailAndPassword = async (signUpData: SignUpData) => {
  const res = await fetch('/sign-up/api', {
    method: 'POST',
    body: JSON.stringify(signUpData),
  });

  if (!res.ok) {
    const { error } = await res.json();
    throw new AuthError(error);
  }

  const { token }: TokenRes = await res.json();

  await signInWithCustomToken(auth, token);
};

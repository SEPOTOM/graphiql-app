import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

import { auth } from '@/utils/auth/firebase';

export const registerWithEmailAndPassword = async (name: string, email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);

  await updateProfile(userCredential.user, {
    displayName: name,
  });
};

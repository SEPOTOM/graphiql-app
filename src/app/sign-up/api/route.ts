import { NextRequest } from 'next/server';
import * as admin from 'firebase-admin';

import { SignUpData, TokenRes } from '@/types';

const serviceAccount: admin.ServiceAccount = {
  projectId: process.env.ADMIN_FIREBASE_PROJECT_ID,
  clientEmail: process.env.ADMIN_FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.ADMIN_FIREBASE_PRIVATE_KEY,
};

const getFirebaseApp = () => {
  if (admin.apps.length === 0) {
    return admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } else {
    return admin.app();
  }
};

export const POST = async (req: NextRequest) => {
  const auth = getFirebaseApp().auth();

  const reqBody: SignUpData = await req.json();

  const { uid } = await auth.createUser(reqBody);
  const token = await auth.createCustomToken(uid);

  const resBody: TokenRes = { token };

  return Response.json(resBody);
};

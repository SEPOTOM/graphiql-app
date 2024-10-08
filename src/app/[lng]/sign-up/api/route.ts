import { NextRequest, NextResponse } from 'next/server';
import * as admin from 'firebase-admin';
import { FirebaseAuthError } from 'firebase-admin/auth';

import { getServerAuthErrorData } from '@/utils';
import { SignUpData, TokenRes } from '@/types';

const serviceAccount = {
  type: process.env.ADMIN_FIREBASE_TYPE,
  project_id: process.env.ADMIN_FIREBASE_PROJECT_ID,
  private_key_id: process.env.ADMIN_FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.ADMIN_FIREBASE_PRIVATE_KEY,
  client_email: process.env.ADMIN_FIREBASE_CLIENT_EMAIL,
  client_id: process.env.ADMIN_FIREBASE_CLIENT_ID,
  auth_uri: process.env.ADMIN_FIREBASE_AUTH_URI,
  token_uri: process.env.ADMIN_FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.ADMIN_FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.ADMIN_FIREBASE_CLIENT_X509_CERT_URL,
  universe_domain: process.env.ADMIN_FIREBASE_UNIVERSE_DOMAIN,
};

const getFirebaseApp = () =>
  admin.apps.length === 0 ?
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    })
  : admin.app();

export const POST = async (req: NextRequest) => {
  try {
    const auth = getFirebaseApp().auth();

    const reqBody: SignUpData = await req.json();

    const { uid } = await auth.createUser(reqBody);
    const token = await auth.createCustomToken(uid);

    const resBody: TokenRes = { token };

    return Response.json(resBody);
  } catch (err) {
    if (err instanceof FirebaseAuthError) {
      const { errorMessage, status } = getServerAuthErrorData(err.code);

      return NextResponse.json({ error: errorMessage }, { status });
    } else {
      throw err;
    }
  }
};

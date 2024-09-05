import { getNewMethodPath, getNewURLPath, getNewBodyPath, getNewGraphQlURLPath } from './getNewPath';
import { auth } from '@/services/auth/firebase';
import { registerWithEmailAndPassword } from '@/services/auth/auth';
import { makeGraphQLRequest } from './makeGraphQlRequests';
import { encodeToBase64, decodeFromBase64 } from './base64Converters';

export {
  auth,
  registerWithEmailAndPassword,
  getNewMethodPath,
  getNewURLPath,
  getNewGraphQlURLPath,
  makeGraphQLRequest,
  encodeToBase64,
  decodeFromBase64,
  getNewBodyPath,
};

import {
  getNewMethodPath,
  getNewURLPath,
  getNewBodyPath,
  getNewGraphQlURLPath,
  getNewPathHeaders,
  getNewGraphQLBodyPath,
} from './getNewPath';
import { auth } from '@/services/auth/firebase';
import { registerWithEmailAndPassword } from '@/services/auth/auth';
import { makeGraphQLRequest } from './makeGraphQlRequests';
import { encodeToBase64, decodeFromBase64 } from './base64Converters';
import initializeRows from './getRowsCount';

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
  getNewPathHeaders,
  getNewGraphQLBodyPath,
  initializeRows,
};

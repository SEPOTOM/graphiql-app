import { getNewMethodPath, getNewURLPath, getNewBodyPath } from './getNewPath';
import { auth } from '@/services/auth/firebase';
import { registerWithEmailAndPassword } from '@/services/auth/auth';
import { makeGraphQLRequest } from './makeGraphQlRequests';
import { encodeToBase64, decodeFromBase64 } from './base64Converters';
import initializeRows from './getRowsCount';
import jsonTabs from './consts';

export {
  auth,
  registerWithEmailAndPassword,
  getNewMethodPath,
  getNewURLPath,
  makeGraphQLRequest,
  encodeToBase64,
  decodeFromBase64,
  getNewBodyPath,
  initializeRows,
  jsonTabs,
};

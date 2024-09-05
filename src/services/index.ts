import { getNewMethodPath, getNewURLPath, getNewBodyPath } from './getNewPath';
import { auth } from '@/services/auth/firebase';
import { registerWithEmailAndPassword } from '@/services/auth/auth';
import { encodeToBase64, decodeFromBase64 } from './base64Converters';

export {
  auth,
  registerWithEmailAndPassword,
  getNewMethodPath,
  getNewURLPath,
  encodeToBase64,
  decodeFromBase64,
  getNewBodyPath,
};

import { getNewMethodPath, getNewURLPath } from './getNewPath';
import { auth } from '@/services/auth/firebase';
import { registerWithEmailAndPassword } from '@/services/auth/auth';
import { makeGraphQLRequest } from './makeGraphQlRequests';

export { auth, registerWithEmailAndPassword, getNewMethodPath, getNewURLPath, makeGraphQLRequest };

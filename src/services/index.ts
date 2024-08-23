import { auth } from '@/services/auth/firebase';
import { loginWithEmailAndPassword, logout, registerWithEmailAndPassword } from '@/services/auth/auth';

export { auth, registerWithEmailAndPassword, loginWithEmailAndPassword, logout };

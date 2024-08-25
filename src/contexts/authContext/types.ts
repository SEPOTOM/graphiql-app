import { User } from 'firebase/auth';

export type AuthStatus = 'authenticated' | 'unauthenticated' | 'loading';

export type SignUpFunc = (username: string, email: string, password: string) => Promise<void>;

export type SignOutFunc = () => Promise<void>;

export type SignInFunc = (email: string, password: string) => Promise<void>;

export interface AuthData {
  status: AuthStatus;
  user: Nullable<User>;
  signUp: SignUpFunc;
  signOut: SignOutFunc;
  signIn: SignInFunc;
}

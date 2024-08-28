import { AuthStatus } from '@/contexts/AuthContext/types';

export const AuthStatuses: { [key in AuthStatus]: AuthStatus } = {
  authenticated: 'authenticated',
  unauthenticated: 'unauthenticated',
  loading: 'loading',
  init: 'init',
};

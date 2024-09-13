import { ReactNode } from 'react';

export interface PublicRouteProps {
  children: ReactNode;
  shouldRedirect?: boolean;
}

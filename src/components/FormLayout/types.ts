import { BaseSyntheticEvent, ReactNode } from 'react';

export interface FormLayoutProps {
  children: ReactNode;
  onSubmit: (e?: BaseSyntheticEvent<object, unknown, unknown>) => Promise<void>;
  title: string;
  lng: string;
}

import { FormEventHandler, ReactNode } from 'react';

export interface FormLayoutProps {
  children: ReactNode;
  onSubmit: FormEventHandler<HTMLFormElement>;
  title: string;
}

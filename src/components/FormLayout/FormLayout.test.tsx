import { BaseSyntheticEvent } from 'react';
import { FirebaseError } from 'firebase/app';

import { AuthError } from '@/utils';
import { renderWithUser } from '@/tests';

import FormLayout from './FormLayout';
import { FormLayoutProps } from './types';

const children = <button type="submit">Submit</button>;
const sharedProps: Pick<FormLayoutProps, 'title' | 'lng'> = {
  title: 'Test',
  lng: 'en',
};

describe('FormLayout', () => {
  it('should handle existing email error', async () => {
    const handleSubmit = (e?: BaseSyntheticEvent) => {
      e?.preventDefault();
      throw new FirebaseError('auth/email-already-exists', 'The email is already exist.');
    };
    const { user, getByRole } = renderWithUser(
      <FormLayout {...sharedProps} onSubmit={handleSubmit}>
        {children}
      </FormLayout>
    );

    await user.click(getByRole('button', { name: 'Submit' }));

    expect(getByRole('alert')).toHaveTextContent(/email/i);
  });

  it('should handle invalid credential error', async () => {
    const handleSubmit = (e?: BaseSyntheticEvent) => {
      e?.preventDefault();
      throw new FirebaseError('auth/invalid-credential', 'The credential provided is invalid.');
    };
    const { user, getByRole } = renderWithUser(
      <FormLayout {...sharedProps} onSubmit={handleSubmit}>
        {children}
      </FormLayout>
    );

    await user.click(getByRole('button', { name: 'Submit' }));

    expect(getByRole('alert')).toHaveTextContent(/credential/i);
  });

  it('should show default message for unexpected errors', async () => {
    const handleSubmit = (e?: BaseSyntheticEvent) => {
      e?.preventDefault();
      throw new TypeError('Failed to fetch');
    };
    const { user, getByRole } = renderWithUser(
      <FormLayout {...sharedProps} onSubmit={handleSubmit}>
        {children}
      </FormLayout>
    );

    await user.click(getByRole('button', { name: 'Submit' }));

    expect(getByRole('alert')).toHaveTextContent(/unexpected error/i);
  });

  it('should show provided message for errors from the route handler', async () => {
    const handleSubmit = (e?: BaseSyntheticEvent) => {
      e?.preventDefault();
      throw new AuthError('Internal server error.');
    };
    const { user, getByRole } = renderWithUser(
      <FormLayout {...sharedProps} onSubmit={handleSubmit}>
        {children}
      </FormLayout>
    );

    await user.click(getByRole('button', { name: 'Submit' }));

    expect(getByRole('alert')).toHaveTextContent('Internal server error.');
  });
});

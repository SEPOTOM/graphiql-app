import { render } from '@testing-library/react';

import { renderWithUser } from '@/tests';
import { AuthProvider } from '@/contexts';

import SignInForm from './SignInForm';

describe('SignInForm', () => {
  it('renders all required fields and submit button', () => {
    const { getByRole, getByLabelText } = render(<SignInForm lng="en" />);

    expect(getByRole('textbox', { name: /email/i })).toBeInTheDocument();
    expect(getByLabelText(/^password/i)).toBeInTheDocument();
  });

  it('displays success alert after successful login', async () => {
    const { user, getByRole, getByLabelText, findByRole } = renderWithUser(
      <AuthProvider>
        <SignInForm lng="en" />
      </AuthProvider>
    );

    await user.type(getByRole('textbox', { name: /email/i }), 'mark@email.com');
    await user.type(getByLabelText(/^password/i), 'mark12345678!');
    await user.click(getByRole('button', { name: /sign in/i }));

    expect(await findByRole('alert')).toHaveTextContent(/success/i);
  });

  it('disables form widgets while the form is submitting', async () => {
    const { user, getByRole, getByLabelText, getAllByRole } = renderWithUser(
      <AuthProvider>
        <SignInForm lng="en" />
      </AuthProvider>
    );
    const emailInput = getByRole('textbox', { name: /email/i });
    const pwdInput = getByLabelText(/^password/i);

    await user.type(emailInput, 'mark@email.com');
    await user.type(pwdInput, 'mark12345678!');
    await user.click(getByRole('button', { name: /sign in/i }));

    expect(emailInput).toBeDisabled();
    expect(pwdInput).toBeDisabled();
    getAllByRole('button').forEach((button) => {
      expect(button).toBeDisabled();
    });
  });
});

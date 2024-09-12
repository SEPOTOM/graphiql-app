import { render } from '@testing-library/react';

import { renderWithUser } from '@/tests';
import { AuthProvider } from '@/contexts';

import SignUpForm from './SignUpForm';

describe('SignUpForm', () => {
  it('renders all required fields and submit button', async () => {
    const { findByRole, getByRole, getByLabelText } = render(<SignUpForm lng="en" />);

    expect(await findByRole('textbox', { name: /username/i })).toBeInTheDocument();
    expect(getByRole('textbox', { name: /email/i })).toBeInTheDocument();
    expect(getByRole('button', { name: /sign up/i })).toBeInTheDocument();
    expect(getByLabelText(/^password/i)).toBeInTheDocument();
    expect(getByLabelText(/confirm password/i)).toBeInTheDocument();
  });


  it('displays success alert after successful registration', async () => {
    const { user, getByRole, getByLabelText, findByRole } = renderWithUser(
      <AuthProvider>
        <SignUpForm lng="en" />
      </AuthProvider>
    );

    await user.type(await findByRole('textbox', { name: /username/i }), 'Mark');
    await user.type(getByRole('textbox', { name: /email/i }), 'mark@email.com');
    await user.type(getByLabelText(/^password/i), 'mark12345678!');
    await user.type(getByLabelText(/confirm password/i), 'mark12345678!');
    await user.click(getByRole('button', { name: /sign up/i }));

    expect(await findByRole('alert')).toHaveTextContent(/success/i);
  });


  it('disables form widgets while the form is submitting', async () => {
    const { user, findByLabelText, getByRole, getByLabelText, getAllByRole } = renderWithUser(
      <AuthProvider>
        <SignUpForm lng="en" />
      </AuthProvider>
    );
    const pwdInput = await findByLabelText(/^password/i);
    const confirmPwdInput = getByLabelText(/confirm password/i);
    const otherWidgets = [...getAllByRole('textbox'), ...getAllByRole('button')];

    await user.type(getByRole('textbox', { name: /username/i }), 'Mark');
    await user.type(getByRole('textbox', { name: /email/i }), 'mark@email.com');
    await user.type(pwdInput, 'mark12345678!');
    await user.type(confirmPwdInput, 'mark12345678!');
    await user.click(getByRole('button', { name: /sign up/i }));

    expect(pwdInput).toBeDisabled();
    expect(confirmPwdInput).toBeDisabled();
    otherWidgets.forEach((widget) => {
      expect(widget).toBeDisabled();
    });
  });
});

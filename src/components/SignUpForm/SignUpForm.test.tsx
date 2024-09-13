import { render } from '@testing-library/react';

import { renderWithUser } from '@/tests';
import { LanguageProvider } from '@/contexts';

import SignUpForm from './SignUpForm';

vi.mock('@/contexts/AuthContext/AuthContext', () => ({
  useAuth: vi.fn(() => ({
    signUp: vi.fn(() => new Promise((res) => setTimeout(res, 100))),
  })),
}));

describe('SignUpForm', () => {
  it('renders all required fields and submit button', async () => {
    const { findByRole, getByRole, getByLabelText } = render(
      <LanguageProvider lang="en">
        <SignUpForm lng="en" />
      </LanguageProvider>
    );

    expect(await findByRole('textbox', { name: /username/i })).toBeInTheDocument();
    expect(getByRole('textbox', { name: /email/i })).toBeInTheDocument();
    expect(getByRole('button', { name: /sign up/i })).toBeInTheDocument();
    expect(getByLabelText(/^password/i)).toBeInTheDocument();
    expect(getByLabelText(/confirm password/i)).toBeInTheDocument();
  });

  it('displays success alert after successful registration', async () => {
    const { user, getByRole, getByLabelText, findByRole } = renderWithUser(
      <LanguageProvider lang="en">
        <SignUpForm lng="en" />
      </LanguageProvider>
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
      <LanguageProvider lang="en">
        <SignUpForm lng="en" />
      </LanguageProvider>
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

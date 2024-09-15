import { renderWithLng, renderWithUserAndLng } from '@/tests';

import SignInForm from './SignInForm';

vi.mock('@/contexts/AuthContext/AuthContext', () => ({
  useAuth: vi.fn(() => ({
    signIn: vi.fn(() => new Promise((res) => setTimeout(res, 100))),
  })),
}));

describe('SignInForm', () => {
  it('renders all required fields and submit button', async () => {
    const { findByRole, getByLabelText } = renderWithLng(<SignInForm lng="en" />);

    expect(await findByRole('textbox', { name: /email/i })).toBeInTheDocument();
    expect(getByLabelText(/^password/i)).toBeInTheDocument();
  });

  it('displays success alert after successful login', async () => {
    const { user, getByRole, getByLabelText, findByRole } = renderWithUserAndLng(<SignInForm lng="en" />);

    await user.type(await findByRole('textbox', { name: /email/i }), 'mark@email.com');
    await user.type(getByLabelText(/^password/i), 'mark12345678!');
    await user.click(getByRole('button', { name: /sign in/i }));

    expect(await findByRole('alert')).toHaveTextContent(/success/i);
  });

  it('disables form widgets while the form is submitting', async () => {
    const { user, findByRole, getByRole, getByLabelText, getAllByRole } = renderWithUserAndLng(<SignInForm lng="en" />);
    const emailInput = await findByRole('textbox', { name: /email/i });
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

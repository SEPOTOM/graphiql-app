import { render } from '@testing-library/react';

import { renderWithUser } from '@/tests';

import PasswordField from './PasswordField';

describe('PasswordField', () => {
  it('has a button to toggle password visibility', async () => {
    const { findByRole } = render(<PasswordField lng="en" />);

    expect(await findByRole('button', { name: /show/i }));
  });

  it('shows the password by pressing the toggle button', async () => {
    const { user, findByRole, getByLabelText } = renderWithUser(<PasswordField lng="en" label="password" />);

    await user.click(await findByRole('button', { name: /show/i }));

    expect(getByLabelText('password')).toHaveAttribute('type', 'text');
  });
});

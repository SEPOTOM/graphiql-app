import { render } from '@testing-library/react';

import PasswordField from './PasswordField';

describe('PasswordField', () => {
  it('has a button to toggle password visibility', async () => {
    const { findByRole } = render(<PasswordField lng="en" />);

    expect(await findByRole('button', { name: /show/i }));
  });
});

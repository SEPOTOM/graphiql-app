import { render } from '@testing-library/react';

import SignInForm from './SignInForm';

describe('SignInForm', () => {
  it('renders all required fields and submit button', () => {
    const { getByRole, getByLabelText } = render(<SignInForm lng="en" />);

    expect(getByRole('textbox', { name: /email/i })).toBeInTheDocument();
    expect(getByLabelText(/^password/i)).toBeInTheDocument();
  });
});

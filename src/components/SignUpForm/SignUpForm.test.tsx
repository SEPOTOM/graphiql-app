import { render } from '@testing-library/react';

import SignUpForm from './SignUpForm';

describe('SignUpForm', () => {
  it('renders all required fields and submit button', () => {
    const { getByRole, getByLabelText } = render(<SignUpForm lng="en" />);

    expect(getByRole('textbox', { name: /username/i })).toBeInTheDocument();
    expect(getByRole('textbox', { name: /email/i })).toBeInTheDocument();
    expect(getByRole('button', { name: /sign up/i })).toBeInTheDocument();
    expect(getByLabelText(/^password/i)).toBeInTheDocument();
    expect(getByLabelText(/confirm password/i)).toBeInTheDocument();
  });
});

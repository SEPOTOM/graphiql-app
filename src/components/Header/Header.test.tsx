import { render } from '@testing-library/react';

import Header from './Header';

describe('Header', () => {
  it('renders the language switcher', () => {
    const { getByLabelText } = render(<Header lng="en" />);

    expect(getByLabelText(/language/i)).toBeInTheDocument();
  });
});

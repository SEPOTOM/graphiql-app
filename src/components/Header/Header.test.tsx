import { Mock } from 'vitest';
import { render } from '@testing-library/react';

import { useAuth } from '@/contexts';

import Header from './Header';

beforeAll(() => {
  vi.mock('@/contexts', () => ({
    useAuth: vi.fn(),
  }));
});

afterAll(() => {
  vi.restoreAllMocks();
});

describe('Header', () => {
  it('renders the language switcher', () => {
    const { getByLabelText } = render(<Header lng="en" />);

    expect(getByLabelText(/language/i)).toBeInTheDocument();
  });

  it('displays the "Sign Out" button for authenticated users', async () => {
    (useAuth as Mock).mockImplementation(() => ({ status: 'authenticated' }));

    const { findByRole } = render(<Header lng="en" />);

    expect(await findByRole('button', { name: /sign out/i })).toBeInTheDocument();
  });

  it('displays the "Sign In" and "Sign Up" links for unauthenticated users', () => {
    (useAuth as Mock).mockImplementation(() => ({ status: 'unauthenticated' }));

    const { getByRole } = render(<Header lng="en" />);

    expect(getByRole('link', { name: /sign in/i })).toBeInTheDocument();
    expect(getByRole('link', { name: /sign up/i })).toBeInTheDocument();
  });
});

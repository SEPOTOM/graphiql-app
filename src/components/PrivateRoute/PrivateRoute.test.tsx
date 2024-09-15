import { Mock } from 'vitest';

import { useAuth } from '@/contexts';
import { renderWithLng } from '@/tests';

import PrivateRoute from './PrivateRoute';

vi.mock('@/contexts/AuthContext/AuthContext', () => ({
  useAuth: vi.fn(),
}));

describe('PrivateRoute', () => {
  it('shows a loading message during authentication', async () => {
    (useAuth as Mock).mockImplementation(() => ({ status: 'init' }));

    const { findByRole } = renderWithLng(<PrivateRoute>Test message</PrivateRoute>);

    expect(await findByRole('paragraph')).toHaveTextContent(/authentication in progress/i);
  });

  it("shows a message during redirect if the user ins't authenticated", async () => {
    (useAuth as Mock).mockImplementation(() => ({ user: null }));

    const { findByRole } = renderWithLng(<PrivateRoute>Test message</PrivateRoute>);

    expect(await findByRole('paragraph')).toHaveTextContent(/redirect/i);
  });

  it('shows the nested content is the user is authenticated', async () => {
    (useAuth as Mock).mockImplementation(() => ({ user: {} }));

    const { findByText } = renderWithLng(<PrivateRoute>Test message</PrivateRoute>);

    expect(await findByText('Test message')).toBeInTheDocument();
  });
});
